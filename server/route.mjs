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
import crypto from 'crypto';
import { addCampground, addComment, signUp, signIn, connect, createCollection, getAllCampground, validateSession } from './main.mjs';


const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: '5mb'}));
app.use('/static', express.static('static'));
app.use('/Assets',express.static('Assets'));
app.use(cookieParser("1234"));

await connect();
await createCollection();

const authenticate=async(req,res,next)=>{
    console.log("Cookie: "+JSON.stringify(req.signedCookies));
    if(req.signedCookies==undefined){
        return res.sendStatus(403);
    }
    
    try{
        let authresult=await validateSession(req.signedCookies["access-token"]);
        next();
    }catch(err){
        res.sendStatus(403);
    }
    // authresult.then((result)=>{
    //     // res.status(200).send("Authenticated : "+result);
    //     next();
    // }).catch((err)=>{
    //     // res.send("Error in authenticating"+err);
    //     res.sendStatus(403);
    // });
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

app.post('/api/addCampground',authenticate,(req,res)=>{
    console.log(req.body);
    addCampground(req.body);
    res.sendStatus(200);
});


app.post('/api/Image',authenticate,(req,res)=>{
    console.log(req.body);
    res.sendStatus(200);
});

app.get('/api/allCampgrounds',authenticate,async(req,res)=>{
    let campgrounds=await getAllCampground();
    res.send(campgrounds).status(200);
});

app.put('/api/HomePage',(req,res)=>{
    var campgroundInfo=getAllCampground();
    res.send(campgroundInfo);
});


app.listen(port,()=>{
    console.log("server started"+Date.now());
});