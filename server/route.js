const express = require('express');
const app = express();
const path=require('path');
const bodyParser = require('body-parser');
const { authentication } = require('./main.mjs');
const port = 3000;
app.use(bodyParser.json());


import { authentication } from './main.mjs';

app.get('/', (req, res) => {
    res.sendFile(path.join(_dirname, '../static/LandingPage/landing.html'), (err) => {
        if (err) {
            res.sendStatus(404);
        }
    });
})
app.get('/signUp', (req, res) => {
    res.sendFile(path.join(_dirname, '../static/SignUp/signUp.html'), (err) => {
        if (err) {
            res.sendStatus(404);
        }
    });
});

app.get('/SignIn', (req, res) => {
    res.sendFile(path.join(__dirname, '../static/SignIn/signin.html'), (err) => {
        if (err) {
            res.sendStatus(404);
        }
    });
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(_dirname, '../static/SearchPage/search.html'), (err) => {
        if (err) {
            res.sendStatus(404);
        }
    });
});

app.get('/addComment', (req, res) => {
    res.sendFile(path.join(_dirname, '../static/AddNewComment/addNewComment.html'), (err) => {
        if (err) {
            res.sendStatus(404);
        }
    });
});

app.get('/addCampground', (req, res) => {
    res.sendFile(path.join(_dirname, '../static/AddNewCampground/addNewCampground.html'), (err) => {
        if (err) {
            res.sendStatus(404);
        }
    });

});


app.post('/SignIn',(req,res)=>{
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Origin","*");
    console.log(req.body);
    authentication(0,req.body);
    res.send(req.body).status(200);

});

app.listen(port,()=>{
    console.log("server started"+Date.now());
});