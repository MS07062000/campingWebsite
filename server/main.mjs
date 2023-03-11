import { connectToDatabase } from '../server/mongodb.mjs';
import { MongoClient } from 'mongodb';
import { db } from '../server/mongodb.mjs';
import { checkPassword, setPassword, tokenGeneration } from './auth.mjs';

export async function connect() {
  await connectToDatabase();
}


export async function createCollection() {
  var collectionList = await db.listCollections().toArray();
  collectionList = collectionList.map(collection => collection.name);
  console.log(collectionList);
  if (collectionList.indexOf("userCredentials") == -1) {
    await db.createCollection("userCredentials");
  }

  if (collectionList.indexOf("user") == -1) {
    await db.createCollection("user");
  }

  if (collectionList.indexOf("session") == -1) {
    await db.createCollection("session");
  }

  if (collectionList.indexOf("comments") == -1) {
    await db.createCollection("comments");
  }

  if (collectionList.indexOf("campgrounds") == -1) {
    await db.createCollection("campgrounds");
  }
}

async function getUserNameIfExists(userName) {
  var result = await db.collection('userCredentials').findOne({ 'userName': userName });
  console.log("Result" + JSON.stringify(result));
  return result;
}

export async function signUp(userInfo, response) {
  if (await getUserNameIfExists(userInfo.userName) == null) {//checkinguserExistsORNot
    let password = await setPassword(userInfo.password);
    // console.log(password);

    let userId = (await db.collection('user').insertOne({})).insertedId;
    console.log(JSON.stringify(userId));

    let doc = { 'userName': userInfo.userName, 'password': password, 'userId': userId };

    //inserting new user
    await db.collection('userCredentials').insertOne(doc);

    return signIn(userInfo, response);
  } else {
    console.log("Error in checking username");
  }
}


async function getHashIfExists(userName) {
  var result = await db.collection('userCredentials').findOne({ 'userName': userName });
  console.log("Result" + JSON.stringify(result));
  return result;
}


export async function signIn(userInfo, response) {
  var hash = (await getHashIfExists(userInfo.userName)).password;
  if (hash == null) {
    //userName doesn't exists
    console.log("Invalid UserName and Password");
  } else {
    let result = await checkPassword(userInfo.password, hash);
    if (result) {
      //redirect to home page
      console.log("Successfully SignIn");
      return storeSessionToken(userInfo, response);
    } else {
      //password wrong
      console.log("Invalid UserName and Password");
    }
  }
}


async function storeSessionToken(userInfo, response) {
  let result = (await db.collection("userCredentials").find({ "userName": userInfo.userName }).toArray())[0];
  console.log(result);
  let sessionId = (await db.collection("session").insertOne({ "userId": result.userId })).insertedId;
  console.log(sessionId);
  let token = await tokenGeneration({}, sessionId.toString());
  await db.collection("session").updateOne({"_id":sessionId},{$set:{"token":token}});
  console.log(JSON.stringify(token));
  response.cookie("access-token", token, {
    httpOnly: false,
  }).sendStatus(200);
  console.log("Successfully added token in session");
}



export async function addComment(commentDetails) {
  await db.collection("comments").insertOne(commentDetails);
}

export async function addCampground(campGroundDetails) {
  await db.collection("campgrounds").insertOne(campGroundDetails);
}

export async function getCampgroundInfo(campgroundName) {
  await db.collection("campgrounds").findOne({ 'name': campgroundName });
}

export async function getCommentForCampground(campgroundName) {
  await db.collection("comments").findOne(campgroundName);
}

export async function getAllCampground() {
  await db.collection("campgrounds").find({}).toArray();
}

export async function add(){

  await db.collection("campgrounds").insertOne();
}