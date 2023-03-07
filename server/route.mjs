// Define "require"
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const express = require('express');
// const path=require('path');
// const bodyParser = require('body-parser');
// const { authentication, connect, createCollection } = require('./main.mjs');
import express from 'express';
import bodyParser from 'body-parser';
import { addCampground, addComment, authentication, connect, createCollection, getAllCampground } from './main.mjs';
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.use('/Assets',express.static('Assets'));

await connect();
await createCollection();


app.post('/api/signIn',(req,res)=>{
    console.log(req.body);
    res.statusCode(200);
    authentication(0,req.body);
});

app.post('/api/signUp',(req,res)=>{
    console.log(req.body);
    res.statusCode(200);
    authentication(1,req.body);
});

app.post('/api/addComment',(req,res)=>{
    console.log(req.body);
    res.statusCode(200);
    addComment(req.body);
});

app.post('/api/addCampground',(req,res)=>{
    console.log(req.body);
    res.statusCode(200);
    addCampground(req.body);
});


app.put('/api/HomePage',(req,res)=>{
    var campgroundInfo=getAllCampground();
    res.send(campgroundInfo);
});


app.listen(port,()=>{
    console.log("server started"+Date.now());
});