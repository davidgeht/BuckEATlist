// The routes for 

const express = require("express");
const path = require("path");
const isAuthenticated = require("../isAuthenticated");


var htmlRoutes = express.Router();

htmlRoutes.get('/', function(req, res, next){
    res.redirect('/main')
});

htmlRoutes.get('/login', function(req, res, next){
    let loginPage = path.join(__dirname, "/public/views/login.html");
    res.send(loginPage);
});

htmlRoutes.get('/signup', function(req, res, next){
    let signupPage = path.join(__dirname, "/public/views/signup.html");
    res.send(signupPage);
});

htmlRoutes.get('/main', isAuthenticated(req, res, next), function(req, res, next){
    let homeObj = {};
    res.render('home', homeObj);
    //res.send('MAIN PAGE');
});

htmlRoutes.get('/api/login', function(req, res, next){
    
})

htmlRoutes.get('/api/login', function(req, res, next){
    
})

htmlRoutes.get('/api/login', function(req, res, next){
    
})

htmlRoutes.get('/api/login', function(req, res, next){
    
})

module.exports = htmlRoutes;