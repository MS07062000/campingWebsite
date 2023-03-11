// Define "require"
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const express = require('express');
// const path=require('path');
// const bodyParser = require('body-parser');
// const { authentication, connect, createCollection } = require('./main.mjs');
import express from 'express';
import bodyParser from 'body-parser';
import { addCampground, addComment, signUp, signIn, connect, createCollection, getAllCampground } from './main.mjs';
import { validatingToken } from './auth.mjs';
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.use('/Assets',express.static('Assets'));

await connect();
await createCollection();

const authenticate=(response)=>{
    validatingToken(req.cookies.access_token,response);
};

app.post('/api/signIn',async(req,res)=>{
    console.log("Body:"+JSON.stringify(req.body));
    console.log(req.body);
    await signIn(req.body,res);
  
});

app.post('/api/signUp',async(req,res)=>{
    console.log("Body:"+JSON.stringify(req.body));
    await signUp(req.body,res);
});

app.post('/api/addComment',(req,res)=>{
    console.log(req.body);
    addComment(req.body);
    res.sendStatus(200);
});

app.post('/api/addCampground',(req,res)=>{
    console.log(req.body);
    addCampground(req.body);
    res.sendStatus(200);
});


app.put('/api/HomePage',(req,res)=>{
    var campgroundInfo=getAllCampground();
    res.send(campgroundInfo);
});


app.listen(port,()=>{
    console.log("server started"+Date.now());
});