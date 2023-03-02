import { connectToDatabase } from '../server/mongodb.mjs';
import { db } from '../server/mongodb.mjs';
import { checkPassword, setPassword } from './auth.js';

export async function connect(){
  await connectToDatabase();
}


export async function createCollection() {
  await db.createCollection("auth", (err, result) => {
    if (err) {
      console.log("Successfully Created auth Collection or already exists");
    }

    if (result) {
      console.log("Successfully Created auth Collection or it already exists");
    }
  });

  await db.createCollection("comments", (err, result) => {
    if (err) {
      console.log("Error in creating comments Collection is:" + err);
    }

    if (result) {
      console.log("Successfully Created comments Collection or it already exists");
    }
  });

  await db.createCollection("campgrounds", (err, result) => {
    if (err) {
      console.log("Error in creating campgrounds Collection is:" + err);
    }

    if (result) {
      console.log("Successfully Created campgrounds Collection or it already exists");
    }
  });


}

export async function authentication(signUpOrsignIn, userInfo) {
  let userNameExistsOrNot = await db.collection.findOne({ 'userName': userInfo.userName }, (err, result) => {
    if (err) {
      
    }

    if (result) {
      //userName already exists
      return result;
    }
  });


  if (signUpOrsignIn) {
    if (userNameExistsOrNot == null) {//checkinguserExistsORNot
      let password = await setPassword(userInfo.password);
      let doc = { 'userName': userInfo.userName, 'password': password };
      //inserting new user
      await db.collection('auth').insertOne(doc, (err, result) => {
        if (err) {
          console.log("error in signUp");
        }

        if (result) {
          console.log("successfully signUp");
        }
      });
    } 


  } else {
    if (userNameExistsOrNot == null) {
      //userName doesn't exists
    } else {
      let result = await checkPassword(userInfo.password, userNameExistsOrNot.hash);
      if (result) {
        //redirect to home page
        console.log("Successfully SignIn");
      } else {
        //password wrong
        console.log("Invalid UserName and Password");
      }
    }
  }
}


async function  addComment(commentDetails) {
  await db.collection("comments").insertOne(commentDetails, (err, result) => {
    if (err) {

    }

    if (result) {

    }
  });
}

async function addCampground(campGroundDetails) {
 await  db.collection("newCampground").insertOne(campGroundDetails, (err, result) => {
    if (err) {

    }

    if (result) {

    }
  });
}

async function getCampgroundInfo(campgroundName) {
 await  db.collection("campgrounds").findOne({ 'name': campgroundName }, (err, result) => {
    if (err) {

    }

    if (result) {

    }
  });
}

async function getCommentForCampground(campgroundName) {
 await  db.collection("comments").findOne(campgroundName, (err, result) => {
    if (err) {

    }

    if (result) {

    }
  });
}

async function getAllCampground() {
 await  db.collection("campgrounds").find({}).toArray((err, result) => {
    if (err) {

    }

    if (result) {

    }
  });
}