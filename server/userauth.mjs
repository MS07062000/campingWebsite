/* eslint-disable object-shorthand */
/* eslint-disable quote-props */
/* eslint-disable dot-notation */

import { connectToDatabase, db } from '../server/mongodb.mjs';
import { checkPassword, emailVerificationTokenGeneration, setPassword, tokenGeneration, validatingToken, verifyTokenFromEmail } from './auth.mjs';

export async function connect () {
  await connectToDatabase();
}

// async function getUserNameIfExists (userName) {
//   const result = await db.collection('userCredentials').findOne({ userName });
//   console.log('Result' + JSON.stringify(result));
//   return result;
// }

async function getUserMailIDIfExists (email) {
  const result = await db.collection('userCredentials').findOne({ email });
  console.log('Result' + JSON.stringify(result));
  return result;
}

export async function signUp (userInfo, response) {
  try {
    const user = await getUserMailIDIfExists(userInfo.email);
    if (user === null) {
      await insertNewUser(userInfo);
      const checkEmailVerified = setInterval(async () => {
        try {
          const verificationStatus = (await db.collection('userCredentials').findOne(userInfo.email)).verified;
          if (verificationStatus) {
            signIn(userInfo, response);
            clearInterval(checkEmailVerified);
            // redirect will automatically clear Interval
          }
        } catch (error) {
          console.error(error);
        }
      }, 60000);
    } else {
      response.status(409).send('Email already exists. Please use a different email address.');
    }
  } catch (error) {
    console.error(error);
    response.status(500).send('Something went wrong. Please try again.');
  }
}

async function insertNewUser (userInfo) {
  const password = await setPassword(userInfo.password);
  // console.log(password);

  const userId = (await db.collection('user').insertOne({})).insertedId;
  console.log(JSON.stringify(userId));
  const payloadForEmailVerification = {
    email: userInfo.email,
    userName: userInfo.userName
  };

  const doc = {
    '_id': userId,
    'email': userInfo.email,
    'userName': userInfo.userName,
    'password': password,
    'verified': false,
    'token': emailVerificationTokenGeneration(payloadForEmailVerification),
    'creationTime': new Date().getTime()
  };

  // inserting new user
  await db.collection('userCredentials').insertOne(doc);
}

// export async function signUp (userInfo, response) {
//   if (await getUserNameIfExists(userInfo.userName) === null) { // checkinguserExistsORNot
//     const password = await setPassword(userInfo.password);
//     // console.log(password);

//     const userId = (await db.collection('user').insertOne({})).insertedId;
//     console.log(JSON.stringify(userId));

//     const doc = { 'userName': userInfo.userName, 'password': password, 'userId': userId };

//     // inserting new user
//     await db.collection('userCredentials').insertOne(doc);
//     return signIn(userInfo, response);
//   } else {
//     console.log('Error in checking username');
//   }
// }

// async function getUserDetailsIfUserNameExists (userName) {
//   const result = await db.collection('userCredentials').findOne({ 'userName': userName });
//   console.log('Result' + JSON.stringify(result));
//   return result;
// }

async function getUserDetailsIfEmailExists (email) {
  const result = await db.collection('userCredentials').findOne({ email });
  console.log('Result' + JSON.stringify(result));
  return result;
}

export async function signIn (userInfo, response) {
  const fetchedUserInfo = await getUserDetailsIfEmailExists(userInfo.email);
  const hash = (await fetchedUserInfo).password;
  const verificationStatus = (await fetchedUserInfo).verified;
  if (hash !== null) {
    const result = await checkPassword(userInfo.password, hash);
    if (result) {
      // redirect to home page
      if (verificationStatus) {
        console.log('Successfully SignIn');
        return storeSessionToken(userInfo, response);
      } else {
        // show modal indication unverified email
        response.status(401).send('Unverified Email. Please check your Email and verify as soon as possible to avoid losing all your signup efforts.');
      }
    } else {
      console.log('Invalid Email and Password');
      response.status(400).send('Invalid Email or Password');
    }
  } else {
    response.status(500).send('Something went wrong. Please try again');
  }
}

export async function verifyLinkSendInGmailOfUser (userName, token) {
  const result = await db.collection('userCredentials').findOne({ userName, token });
  let tokenValid = false;
  await verifyTokenFromEmail(token).then((response, error) => {
    if (response) {
      tokenValid = true;
    }
    if (error) {
      tokenValid = false;
    }
  });

  if (!result.verified && tokenValid) {
    await db.collection('userCredentials').findOneAndUpdate({ userName, token }, { $set: { verified: true } });
    return true;
  } else {
    return false;
  }
}

async function storeSessionToken (userInfo, response) {
  const result = (await db.collection('userCredentials').find({ userName: userInfo.userName }).toArray())[0];
  console.log(result);

  const sessionId = (await db.collection('session').insertOne({ userId: result.userId })).insertedId;
  console.log(sessionId);

  const token = await tokenGeneration({}, sessionId.toString());
  await db.collection('session').updateOne({ _id: sessionId }, { $set: { token } });
  console.log(JSON.stringify(token));

  response.cookie('userName', userInfo.userName, {
    httpOnly: false,
    signed: true
  });

  response.cookie('access-token', token, {
    httpOnly: false,
    signed: true
  }).sendStatus(200);
  console.log('Successfully added token in session');
}

export async function logOut (request, response) {
  await db.collection('session').findOneAndDelete({ token: request.signedCookies['access-token'] });
  await response.clearCookie('access-token');
  await response.clearCookie('userName');
  response.sendStatus(200);
}

export async function validateSession (token) {
  const userSessionInfo = (await db.collection('session').find({ token }).toArray())[0];
  console.log(JSON.stringify(userSessionInfo));
  return await validatingToken(token, userSessionInfo._id.toString());
}
