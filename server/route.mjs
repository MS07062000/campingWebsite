/* eslint-disable quote-props */
/* eslint-disable dot-notation */

// Define "require"
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const express = require('express');
// const path=require('path');
// const bodyParser = require('body-parser');
// const { authentication, connect, createCollection } = require('./main.mjs');
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { addCampground, addComment, signUp, signIn, connect, createCollection, getAllCampground, validateSession, logOut, getCampgroundInfo, getCommentForCampground, verifyLinkSendInGmailOfUser } from './main.mjs';
import { emailVerificationTokenGeneration } from './auth.mjs';

const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: '5mb' }));
app.use(cookieParser(process.env.COOKIE_SECRET));

await connect();
await createCollection();

// --------------------------------------------------------------------------------------------------
// unauthenticated routes
app.use('/static', express.static('static'));
app.use('/Assets', express.static('Assets'));
app.use('/', express.static('./static/LandingPage/landing.html'));
app.use('/signIn', express.static('./static/SignIn/signin.html'));
app.use('/signUp', express.static('./static/SignUp/signup.html'));
app.use('/search', express.static('./static/SearchPage/search.html'));

// authenticated routes
const authenticate = async (req, res, next) => {
  console.log('Cookie: ' + JSON.stringify(req.signedCookies));
  if (req.signedCookies === undefined) {
    return res.sendStatus(403);
  }

  try {
    await validateSession(req.signedCookies['access-token']);
    next();
  } catch (err) {
    res.redirect('/signUp');
    // res.sendStatus(403);
  }
};

app.use('/campground/:campName', authenticate, express.static('./static/IndividualCampgroundPage/individualcampground.html'));
app.use('/addCampground', authenticate, express.static('./static/AddNewCampground/addNewCampground.html'));
app.use('/addComment/:campName', authenticate, express.static('./static/AddNewComment/addNewComment.html'));

// --------------------------------------------------------------------------------------------------

app.post('/api/signIn', async (req, res) => {
  console.log('Body:' + JSON.stringify(req.body));
  console.log(req.body);
  await signIn(req.body, res);
});

app.post('/api/signUp', async (req, res, next) => {
  console.log('Body:' + JSON.stringify(req.body));
  await signUp(req.body, res);
});

app.get('/api/verify/:userName/:verificationToken', async (req, res, next) => {
  console.log('Username: ' + req.params.userName);
  console.log('Token: ' + req.params.verificationToken);
  await verifyLinkSendInGmailOfUser(req.params.userName, req.params.verificationToken).then((response) => {
    if(response){
      //pass username and password for signin directly so that homepage gets open
      signIn(userName,res);
    } else {
      // create a html file which tells user that verification link expires regenerate 
      // button rakho aur fir user click kiya toh link regenerate karo
    }
  });
});

app.get('/api/userName', (req, res) => {
  console.log('UserName : ' + req.signedCookies.userName);
  res.send({ 'userName': req.signedCookies.userName }).status(200);
});

app.get('/api/logout', async (req, res) => {
  await logOut(req, res);
});

app.post('/api/addComment/:campgroundName', authenticate, async (req, res) => {
  console.log(req.body);
  await addComment(req.body);
  res.sendStatus(200);
});

app.post('/api/addCampground', authenticate, async (req, res) => {
  console.log(req.body);
  await addCampground(req.body);
  res.sendStatus(200);
});

app.post('/api/Image', authenticate, (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.get('/api/allCampgrounds', async (req, res) => {
  const campgrounds = await getAllCampground();
  res.send(campgrounds).status(200);
});

app.put('/api/HomePage', (req, res) => {
  const campgroundInfo = getAllCampground();
  res.send(campgroundInfo);
});

app.get('/api/campInfo/:campgroundName', async (req, res) => {
  const campInfo = {};
  campInfo['campDetails'] = await getCampgroundInfo(req.params.campgroundName);
  campInfo['campComments'] = await getCommentForCampground(req.params.campgroundName);
  console.log(campInfo);
  res.send(campInfo).status(200);
});

app.listen(port, () => {
  console.log('server started' + Date.now());
});
