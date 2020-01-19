// The routes for 

const express = require("express");
const path = require("path");
const isAuthenticated = require("../isAuthenticated");


var htmlRoutes = express.Router();

htmlRoutes.get('/', function(req, res){
    res.redirect('/home')
});

htmlRoutes.get('/login', function(req, res){
    let loginPage = path.join(__dirname, "../../public/views/login.html");
    res.sendFile(loginPage);
});

htmlRoutes.get('/signup', function(req, res){
    let signupPage = path.join(__dirname, "../../public/views/signup.html");
    res.sendFile(signupPage);
});

htmlRoutes.get('/home', isAuthenticated, 
function(req, res, next){
    let homeObj = {};
    homeObj.buckeatList = [];
    homeObj.user = {};
    homeObj.title = '';
    console.log('trying to call homepage')
    res.render('home', homeObj);
    //res.send('MAIN PAGE');
});

htmlRoutes.get('/search', isAuthenticated, 
function(req, res, next){
    res.render('search');
    //res.send('MAIN PAGE');
});

htmlRoutes.get('/api/login', function(req, res, next){
    
})

htmlRoutes.get('/api/login', function(req, res, next){
    
})

htmlRoutes.get('/api/login', function(req, res, next){
    
})

module.exports = htmlRoutes;