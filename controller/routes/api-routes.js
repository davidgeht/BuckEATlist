// Controller code

const express = require("express");
const path = require("path");
//const User = require("TBD"); // TBD the model files
const Zomato = require("../../api/zomato") // TBD for API file
//const City = require("TBD"); // TBD the city file
//const Restaurant = require("TBD"); // TBD the model files
const passport = require("passport");
//let user = new User();
//let city = new City();
let zomato = new Zomato();

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
    let result = zomato.searchCity(searchSrt);

})

apiRoutes.get('/api/search/restaurants', function(req, res, next){
    
})

apiRoutes.get('/api/users/:id/buckeatlist/', function(req, res, next){
    let id = req.params.id;
    let allRest = {};
    allRest = user.getBuckeatlistExt(id);
    let coords = {};
    // TBD get coordinates only from the result
    res.json(coords);
})

apiRoutes.post('/api/search/location', async function(req, res){
    //console.log(req);
    let searchStr = req.body.searchStr;
    console.log('Search is for ', searchStr);
    let allLocs = await zomato.searchLocations(searchStr);
    console.log('AllLocs');
    console.log(allLocs);
    // let allLocsSend = [];
    // for (i of allLocs){
    //     let loc = {};
    //     allLocsSend.push(loc);
    // }
    res.json(allLocs);
})

apiRoutes.get('/api/search/:locId/:cuisineId', async function(req, res){
    let locId = req.params.locId;
    let cuisineId = req.params.cuisineId;
    let restaurants = await zomato.searchRestaurants(locId, cuisineId);
    res.json(restaurants);
})

module.exports = apiRoutes;