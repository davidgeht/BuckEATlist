// Controller code

const express = require("express");
const path = require("path");



var apiRoutes = express.Router();

apiRoutes.get('/api/login', function(req, res, next){
    res.status(200).send('this is an API call for login');
})

apiRoutes.get('/api/signup', function(req, res, next){
    res.status(200).send('this is an API call for signup');
})

apiRoutes.get('/api/login', function(req, res, next){
    
})

apiRoutes.get('/api/login', function(req, res, next){
    
})

apiRoutes.get('/api/login', function(req, res, next){
    
})

module.exports = apiRoutes;