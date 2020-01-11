// The routes for 

const express = require("express");
const path = require("path");


var htmlRoutes = express.Router();

htmlRoutes.get('/', function(req, res, next){
    if (!req.body.user) {
        res.redirect('/login');
    }
    else {res.redirect('/main')}
    
});

htmlRoutes.get('/login', function(req, res, next){
    res.send('LOGIN PAGE')
});

htmlRoutes.get('/signup', function(req, res, next){
    res.send('SIGNUP PAGE')
});

htmlRoutes.get('/main', function(req, res, next){
    res.send('MAIN PAGE')
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