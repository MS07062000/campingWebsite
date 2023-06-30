/* eslint-disable object-shorthand */
/* eslint-disable quote-props */

import { db } from './mongodb.mjs';

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

export async function getAllCampgroundBySearchCriteria (userInput) {
  // Perform a case-insensitive search using regular expression
  const regex = new RegExp(userInput, 'i');
  return await db.collection('campgrounds').find({ 'authenticated': 1, 'campgroundName': { $regex: regex } }).toArray();
}

export async function add () {
  await db.collection('campgrounds').insertOne();
}

// export async function getCampgroundNames (searchValue) { }
