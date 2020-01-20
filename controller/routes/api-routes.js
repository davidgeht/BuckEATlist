// Controller code

const express = require("express");
const bcrypt = require("bcryptjs");
const path = require("path");
const isAuthenticated = require("../isAuthenticated");
const User = require("../../model/classes/user"); // TBD the model files
const Bucketlist = require("../../model/classes/bucketlist");
const Restaurant = require("../../model/classes/restaurant");
const Zomato = require("../../api/zomato"); // TBD for API file
const Yelp = require("../../api/yelp");
//const City = require("TBD"); // TBD the city file
//const Restaurant = require("TBD"); // TBD the model files
const passport = require("../../config/authConfigLocal");
const saltRounds = 10;
let user = new User();
let bucketlist = new Bucketlist();
//let city = new City();
let zomato = new Zomato();
let yelp = new Yelp();
let restaurant = new Restaurant();

let checkUserExists = function(req, res, next){
    let email = req.body.email;
    let emailExists = user.emailExists(email);
    emailExists.then(function(response){
        //console.log('response = ',response);
        if (!response) {
            next();
        } else {
            console.log('sending error');
            res.status('400').send('ERROR: User with this email already exists');
        }
    })
    .catch(err => {
        throw err
    })
}

let hash = async function(password) {
    let hash = await bcrypt.hash(password, saltRounds);
    return hash;
}


var apiRoutes = express.Router();

apiRoutes.post('/api/login', passport.authenticate("local", {failureMessage: 'Incorrect user name or password'}), function(req, res){
    res.send('Success');
});

apiRoutes.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});

apiRoutes.post('/api/signup', checkUserExists, async function(req, res){
    console.log('ready to insert');
    let {firstName, lastName, email, password} = req.body;
    let hashed = await hash(password); //hash the password before saving;
    user.addNew(firstName, lastName, email, hashed)
    .then(function(response) {res.send('200')})
    .catch(function(err) {res.status(500).send('There was an error creating user: '+err)});
});


apiRoutes.post('/api/search/restaurantsNearby', isAuthenticated, async function(req, res, next){
    let lat = req.body.latitude;
    let lon = req.body.longitude;
    let radius = req.body.radius;
    let term = req.body.term;
    let response;
    if (!term || term.length < 1) {
        console.log('request without term')
        response = await yelp.searchRestoByCoord(lat, lon, radius);
    } else {
        console.log('request with term')
        response = await yelp.searchRestoByCoordAndTerm(lat, lon, radius, term);
    };
    let results = response.data.businesses;
    //  make a call for the user, and verify if he alrady has a resto in the bucketlist. Add a boolean to the output.
    let userId = req.user.id;   
    let userBuckL = await bucketlist.getBucketlistAll(userId);
    let buckIds = [];
    for (buckItem of userBuckL) {
        buckIds.push(buckItem.yelp_id)
    }
    for (result of results) {
        if (buckIds.includes(result.id)) {
            result.inBucketlist = true;
        } else {
            result.inBucketlist = false;
        }
    }
    //console.log(results.data);
    res.json(results);
});


apiRoutes.post('/api/search/restaurants', isAuthenticated, async function(req, res){
    let location = req.body.location;
    let term = req.body.term;
    let response;
    if (!term || term.length < 1) {
        console.log('request without term');
        response = await yelp.searchRestoByLocation(location);
    } else {
        console.log('request with term');
        response = await yelp.searchRestoByLocationAndTerm(location, term);
    }
    //console.log(response.data.businesses);
    let results = response.data.businesses;
    // call to check if the rest is already in the bucketlist
    let userId = req.user.id;   
    let userBuckL = await bucketlist.getBucketlistAll(userId);
    let buckIds = [];
    for (buckItem of userBuckL) {
        buckIds.push(buckItem.yelp_id)
    }
    for (result of results) {
        if (buckIds.includes(result.id)) {
            result.inBucketlist = true;
        } else {
            result.inBucketlist = false;
        }
    }
    console.log('Sending the response');
    res.json(results);
});


apiRoutes.post('/api/buckeatlist/add', isAuthenticated, async function(req, res){
    
    let userId = req.user.id;
    let name = req.body.name.replace("'","''");
    let yelpId = req.body.id;
    let rating = req.body.rating;
    let price = req.body.price;
    let lon = req.body.coordinates.longitude;
    let lat = req.body.coordinates.latitude;
    let cuisine = JSON.stringify(req.body.categories);
    let city = req.body.location.city;
    let address = JSON.stringify(req.body.location);
    let website = req.body.url;
    let reviewCount = req.body.review_count;
    let storedRest = await restaurant.getAllByYelpId(yelpId);
    let id;
    if (storedRest.length < 1) {
        await restaurant.addNew(name, yelpId, rating, price, lon, lat, city, address, website, reviewCount)
        let newRecord = await restaurant.getAllByYelpId(yelpId);
        id = newRecord[0].id;
    } else {
        console.log(storedRest);
        id = storedRest[0].id;
        console.log(id);
    }
    console.log('id = ', id);
    await bucketlist.addNew(userId, id, 0);    
    res.status('200').send('Item added');
});


apiRoutes.get('/api/users/buckeatlist', isAuthenticated, function(req, res){
    let userId = req.user.id;
    bucketlist.getBucketlistExpanded(userId)
    .then(function(allRest){
        //console.log(allRest)
        res.send(allRest);
    })
    .catch(function(error){});
});


apiRoutes.get('/api/user/visited', isAuthenticated, async function(req, res){
    let userId = req.user.id;
    let response = await bucketlist.getVisited(userId);
    console.log(response);
    res.json(response);
});


apiRoutes.get('/api/restaurants/:id', isAuthenticated, async function(req, res){
    let businessId = req.params.id;
    let response = await yelp.getRestoDetail(businessId);
    console.log(response.data);
    res.json(response.data);
});

apiRoutes.post('/api/checkoffRestaurant/:bucketid', async function(req, res){
    let dbId = req.params.bucketid;
    console.log("got id:" + dbId)
    await bucketlist.updateRes(dbId);
    res.status('200').send('Updated successfully');
});

apiRoutes.post('/api/deleteRestaurant/:id', isAuthenticated, async function(req, res){
    let dbId = req.params.id;
    await bucketlist.delRest(dbId);
    res.status('200').send('Deleted successfully');
});



module.exports = apiRoutes;