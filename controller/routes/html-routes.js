// The routes for 

const express = require("express");
const path = require("path");
const isAuthenticated = require("../isAuthenticated");
const Bucketlist = require("../../model/classes/bucketlist");

let mbuckeatlist = new Bucketlist();
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
async function(req, res, next){
    let homeObj = {};
    console.log(req.user);
    homeObj.restaurants = await mbuckeatlist.getBucketlistExpanded(req.user.id);
    homeObj.username = req.user.firstname;
    homeObj.title = 'My buckEATlist';
    console.log('trying to call homepage');
    res.render('home', homeObj);
    
});

htmlRoutes.get('/search', isAuthenticated, 
function(req, res, next){
    res.render('search');
    
});

module.exports = htmlRoutes;