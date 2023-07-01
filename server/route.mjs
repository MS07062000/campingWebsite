/* eslint-disable quote-props */
/* eslint-disable dot-notation */

// Define "require"
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const express = require('express');
// const path=require('path');
// const bodyParser = require('body-parser');
// const { authentication, connect, createCollection } = require('./campgroundUtils.mjs');
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { addCampground, addComment, createCollection, getAllCampground, getAllCampgroundBySearchCriteria, getCampgroundInfo, getCommentForCampground } from './campgroundUtils.mjs';
import { connect, signUp, signIn, validateSession, logOut, verifyLinkSendInGmailOfUser, isUserVerified } from './userauth.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: '5mb' }));
app.use(cookieParser(process.env.COOKIE_SECRET));

await connect();
await createCollection();

// --------------------------------------------------------------------------------------------------
// unauthenticated routes
// console.log(path.join(__dirname, '../static/LandingPage/landing.html'));
app.use('/static', express.static(path.join(__dirname, '../static')));
app.use('/Assets', express.static(path.join(__dirname, '../Assets')));
app.use('/landing', express.static(path.join(__dirname, '../static/LandingPage/landing.html')));
app.use('/signIn', express.static(path.join(__dirname, '../static/SignIn/signin.html')));
app.use('/signUp', express.static(path.join(__dirname, '../static/SignUp/signup.html')));
app.use('/search', express.static(path.join(__dirname, '../static/SearchPage/search.html')));
app.use('/mailVerificationResponse/:verifiedStatus', express.static(path.join(__dirname, '../static/MailVerificationResponse/mailVerificationResponse.html')));

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

app.use('/campground/:campName', authenticate, express.static(path.join(__dirname, '../static/IndividualCampgroundPage/individualcampground.html')));
app.use('/addCampground', authenticate, express.static(path.join(__dirname, '../static/AddNewCampground/addNewCampground.html')));
app.use('/addComment/:campName', authenticate, express.static(path.join(__dirname, '../static/AddNewComment/addNewComment.html')));

// --------------------------------------------------------------------------------------------------
app.get('/', (req, res) => {
  res.redirect('/landing');
});

app.post('/api/signIn', async (req, res) => {
  console.log('Body:' + JSON.stringify(req.body));
  console.log(req.body);
  await signIn(req.body, res);
});

app.post('/api/signUp', async (req, res) => {
  console.log('Body:' + JSON.stringify(req.body));
  await signUp(req.body, res);
});

app.get('/api/verify/:userName/:verificationToken', async (req, res) => {
  console.log('Username: ' + req.params.userName);
  console.log('Token: ' + req.params.verificationToken);
  isUserVerified(req.params.userName, req.params.verificationToken).then((response) => {
    if (response) {
      res.redirect('/signIn');
    } else {
      verifyLinkSendInGmailOfUser(req.params.userName, req.params.verificationToken).then((response) => {
        if (response) {
          res.redirect(`/mailVerificationResponse/${response}`);
        }
      });
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

app.get('/api/search/:userInput', async (req, res) => {
  const campgrounds = await getAllCampgroundBySearchCriteria(req.params.userInput);
  res.send(campgrounds).status(200);
});

app.get('/api/campInfo/:campgroundName', async (req, res) => {
  const campInfo = {};
  campInfo['campDetails'] = await getCampgroundInfo(req.params.campgroundName);
  campInfo['campComments'] = await getCommentForCampground(req.params.campgroundName);
  console.log(campInfo);
  res.send(campInfo).status(200);
});

app.listen(port, () => {
  console.log('server started' + port);
});
