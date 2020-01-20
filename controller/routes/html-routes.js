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

    homeObj.restaurants = await mbuckeatlist.getBucketlistExpanded(req.user.id);
    homeObj.username = req.user.firstname;
    homeObj.title = 'My buckEATlist';
   
    res.render('home', homeObj);
    
});

htmlRoutes.get('/noms-map', isAuthenticated, 
async function(req, res, next){
    let modelObj = {};
    
    modelObj.restaurants = await mbuckeatlist.getVisited(req.user.id);
    modelObj.username = req.user.firstname;
    modelObj.title = 'My Noms Map';
    
    res.render('visited', modelObj);
    
});

htmlRoutes.get('/search', isAuthenticated, 
function(req, res, next){
    let modelObj = {username: req.user.firstname, title: "Search"};
    res.render('search', modelObj);
    
});

module.exports = htmlRoutes;