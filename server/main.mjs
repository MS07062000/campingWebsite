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
  if (collectionList.indexOf("auth") == -1) {
    try {
      var result=await db.createCollection("auth", (err, result) => {
        if (err) {
          console.log("Error in Created auth Collection or already exists");
          throw new Error(err)
        }
      });
      console.log(result);
    } catch (err) {
      
    }
  }


  if (collectionList.indexOf("comments") == -1) {
    await db.createCollection("comments", (err, result) => {
      if (err) {
        console.log("Error in creating comments Collection is:" + err);
      }

      if (result) {
        console.log("Successfully Created comments Collection or it already exists");
      }
    });
  }


  if (collectionList.indexOf("campgrounds") == -1) {
    await db.createCollection("campgrounds", (err, result) => {
      if (err) {
        console.log("Error in creating campgrounds Collection is:" + err);
      }

      if (result) {
        console.log("Successfully Created campgrounds Collection or it already exists");
      }
    });
  }
}

export async function authentication(signUpOrsignIn, userInfo) {
  console.log(userInfo);


}

async function getUserNameIfExists(userName) {
  var result = await db.collection('auth').findOne({ 'userName': userName });
  return result;
}

export async function signUp(userInfo, response) {
  if (getUserNameIfExists(userInfo.userName) == null) {//checkinguserExistsORNot
    let password = await setPassword(userInfo.password);
    let doc = { 'userName': userInfo.userName, 'password': password };
    //inserting new user
    await db.collection('auth').insertOne(doc, (err, result) => {
      if (err) {
        console.log(err);
      }

      if (result) {
        console.log("successfully signUp");
        return tokenGeneration(userInfo);
      }
    });
  } else {
    console.log("Error in checking username");
  }
}


async function getHashIfExists(userName) {
  var result = await db.collection('auth').findOne({ 'userName': userName });
  return result;
}


export async function signIn(userInfo) {
  var hash = getHashIfExists(userInfo.userName).hash;
  if (hash == null) {
    //userName doesn't exists
    console.log("Invalid UserName and Password");
  } else {
    let result = await checkPassword(userInfo.password, hash);
    if (result) {
      //redirect to home page
      console.log("Successfully SignIn");
      return tokenGeneration(userInfo);
    } else {
      //password wrong
      console.log("Invalid UserName and Password");
    }
  }
}

export async function addComment(commentDetails) {
  await db.collection("comments").insertOne(commentDetails, (err, result) => {
    if (err) {
      console.log("Error in adding new Comment");
      console.log(err);
    }

    if (result) {
      console.log("Added Comments Successfully");
    }
  });
}

export async function addCampground(campGroundDetails) {
  await db.collection("campgrounds").insertOne(campGroundDetails, (err, result) => {
    if (err) {
      console.log("Error in adding new Campground");
      console.log(err);
    }

    if (result) {
      console.log("Added newCampground Successfully");
    }
  });
}

export async function getCampgroundInfo(campgroundName) {
  await db.collection("campgrounds").findOne({ 'name': campgroundName }, (err, result) => {
    if (err) {
      console.log("Error in getting all info for " + campgroundName);
      console.log(err);
    }

    if (result) {
      return result;
    }
  });
}

export async function getCommentForCampground(campgroundName) {
  await db.collection("comments").findOne(campgroundName, (err, result) => {
    if (err) {
      console.log("Error in getting all comments for " + campgroundName + " Campground");
      console.log(err);
    }

    if (result) {
      return result;
    }
  });
}

export async function getAllCampground() {
  await db.collection("campgrounds").find({}).toArray((err, result) => {
    if (err) {
      console.log("Error in getting all Campgrounds");
      console.log(err);
    }

    if (result) {
      return result;
    }
  });
}