/* eslint-disable object-shorthand */
/* eslint-disable quote-props */

import { connectToDatabase, db } from '../server/mongodb.mjs';
import { checkPassword, emailVerificationTokenGeneration, setPassword, tokenGeneration, validatingToken, verifyTokenFromEmail } from './auth.mjs';

export async function connect () {
  await connectToDatabase();
}

export async function createCollection () {
  let collectionList = await db.listCollections().toArray();
  collectionList = collectionList.map(collection => collection.name);
  console.log(collectionList);
  if (collectionList.indexOf('userCredentials') === -1) {
    await db.createCollection('userCredentials');
  }

  if (collectionList.indexOf('user') === -1) {
    await db.createCollection('user');
  }

  if (collectionList.indexOf('session') === -1) {
    await db.createCollection('session');
  }

  if (collectionList.indexOf('comments') === -1) {
    await db.createCollection('comments');
  }

  if (collectionList.indexOf('campgrounds') === -1) {
    await db.createCollection('campgrounds');
  }
}

async function getUserNameIfExists (userName) {
  const result = await db.collection('userCredentials').findOne({ 'userName': userName });
  console.log('Result' + JSON.stringify(result));
  return result;
}

async function getUserMailIDIfExists (email) {
  const result = await db.collection('userCredentials').findOne({ 'email': email });
  console.log('Result' + JSON.stringify(result));
  return result;
}
// async function emailVerification(){}

export async function signUp (userInfo, response) {
  if (await getUserMailIDIfExists(userInfo.email) === null) { // checkinguserExistsORNot
    const password = await setPassword(userInfo.password);
    // console.log(password);

    const userId = (await db.collection('user').insertOne({})).insertedId;
    console.log(JSON.stringify(userId));
    const payloadForEmailVerification = {
      'email': userInfo.email,
      'userName': userInfo.userName
    };

    const doc = {
      'email': userInfo.email,
      'userName': userInfo.userName,
      'password': password,
      'userId': userId,
      'verified': false,
      'token': emailVerificationTokenGeneration(payloadForEmailVerification),
      'creation Time': new Date().getTime()
    };

    // inserting new user
    await db.collection('userCredentials').insertOne(doc);
    return signIn(userInfo, response);
  } else {
    response.status(409).send('Email already exists. Please use a different email address.');
  }
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

async function getUserDetailsIfUserNameExists (userName) {
  const result = await db.collection('userCredentials').findOne({ 'userName': userName });
  console.log('Result' + JSON.stringify(result));
  return result;
}

async function getUserDetailsIfEmailExists (email) {
  const result = await db.collection('userCredentials').findOne({ 'email': email });
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
      console.log('Successfully SignIn');
      return storeSessionToken(userInfo, response);
    } else {
      // password wrong
      console.log('Invalid Email and Password');
    }
  } else {
    console.log('Something went wrong. Please try again');
  }
  
  if (!verificationStatus) {
// tell them to verify
  } else {
    
  }
}

async function storeSessionToken (userInfo, response) {
  const result = (await db.collection('userCredentials').find({ 'userName': userInfo.userName }).toArray())[0];
  console.log(result);
  const sessionId = (await db.collection('session').insertOne({ 'userId': result.userId })).insertedId;
  console.log(sessionId);
  const token = await tokenGeneration({}, sessionId.toString());
  await db.collection('session').updateOne({ '_id': sessionId }, { $set: { 'token': token } });
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

export async function verifyLinkSendInGmailOfUser (userName, token) {
  const result = await db.collection('userCredentials').find({ 'userName': userName, 'token': token });
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
    await db.collection('userCredentials').updateOne({ 'userName': userName, 'token': token }, { $set: { 'verified': true } });
    return true;
  } else {
    return false;
  }
}


export async function logOut (request, response) {
  await db.collection('session').findOneAndDelete({ 'token': request.signedCookies['access-token'] });
  await response.clearCookie('access-token');
  await response.clearCookie('userName');
  response.sendStatus(200);
}

export async function validateSession (token) {
  const userSessionInfo = (await db.collection('session').find({ 'token': token }).toArray())[0];
  console.log(JSON.stringify(userSessionInfo));
  return await validatingToken(token, userSessionInfo._id.toString());
}

export async function addComment (commentDetails) {
  await db.collection('comments').insertOne(commentDetails);
}

export async function addCampground (campGroundDetails) {
  await db.collection('campgrounds').insertOne(campGroundDetails);
}

export async function getCampgroundInfo (campgroundName) {
  const campInfo = await db.collection('campgrounds').findOne({ 'campgroundName': campgroundName });
  return campInfo;
}

export async function getCommentForCampground (campgroundName) {
  const campComment = await db.collection('comments').find({ 'campgroundName': campgroundName }).toArray();
  return campComment;
}

export async function getAllCampground () {
  return await db.collection('campgrounds').find({ 'authenticated': 1 }).toArray();
}

export async function add () {
  await db.collection('campgrounds').insertOne();
}

// export async function getCampgroundNames (searchValue) { }
