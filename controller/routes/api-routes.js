// Controller code

const express = require("express");
const path = require("path");
const User = require("TBD"); // TBD the model files
const API = require("TBD") // TBD for API file
const City = require("TBD"); // TBD the city file
const Restaurant = require("TBD"); // TBD the model files

let user = new User();
let city = new City();
let api = new API();

let checkUserExists = function(req, res, next){
    let email = req.body.email;
    if (!user.emailExists(email)) {
        return next();
    } else {
        res.send('ERROR: User with this email already exists');
    }
}

var apiRoutes = express.Router();

apiRoutes.post('/api/login', passport.authenticate("local"), function(req, res){
    res.json(req.user);
})

apiRoutes.post('/api/signup', checkUserExists, async function(req, res, next){
    let {firstName, lastName, email, password} = req.body;
    password = password; //hash the password before saving;
    await user.addNew(firstName, lastName, email, password);
    res.status(200).send('User created successfully');
})

apiRoutes.get('/api/search/cities', async function(req, res, next){
    let cities = await city.findLike(req.body.city);
    if (!cities) {
        res.send("No cities found");
    } else {
        res.json(cities);
    }
})

apiRoutes.get('/api/search/city', function(req, res, next){
    let searchSrt = req.body.searchStr;
    let result = api.searchCity(searchSrt);

})

apiRoutes.get('/api/search/restaurants', function(req, res, next){
    
})

apiRoutes.get('/api/users/:id/buckeatlist/coords', function(req, res, next){
    let id = req.params.id;
    let allRest = {};
    allRest = user.getBuckeatlistExt(id);
    let coords = {};
    // TBD get coordinates only from the result
    res.json(coords);
})

apiRoutes.get('/api/search/location',function(req, res){
    let searchStr = req.body.searchStr;
    let allLocs = api.searchLocation(searchStr);
    let allLocsSend = [];
    for (i of allLocs){
        let loc = {};
        allLocsSend.push(loc);
    }
    res.json(allLocsSend);
})

apiRoutes.get('/api/search/:locId/:cuisineId',function(req, res){
    let locId = req.params.locId;
    let cuisineId = req.params.cuisineId;
    let restaurants = api.searchRestaurants(locId, cuisineId);
    res.json(restaurants);
})

module.exports = apiRoutes;