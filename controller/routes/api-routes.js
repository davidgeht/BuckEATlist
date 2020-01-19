// Controller code

const express = require("express");
const bcrypt = require("bcryptjs");
const path = require("path");
const User = require("../../model/classes/user"); // TBD the model files
const Bucketlist = require("../../model/classes/bucketlist");
const Resturant = require("../../model/classes/resturant");
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
let restaurant = new Resturant();

let checkUserExists = function(req, res, next){
    let email = req.body.email;
    let emailExists = user.emailExists(email);
    emailExists.then(function(response){
        console.log('response = ',response);
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

let test = async function(){
    let result1 = await zomato.searchRestaurantsByCoord(-79.413449,43.778126,100);
    console.log('result1');
    console.log(result1.data.restaurants);
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

apiRoutes.get('/api/search/cities', async function(req, res, next){
    let cities = await city.findLike(req.body.city);
    if (!cities) {
        res.send("No cities found");
    } else {
        res.json(cities);
    }
});

apiRoutes.get('/api/search/city', function(req, res, next){
    let searchSrt = req.body.searchStr;
    let result = zomato.searchCity(searchSrt);

});

apiRoutes.get('/api/search/restaurants', function(req, res, next){
    
});

apiRoutes.post('/api/search/restaurantsNearby', async function(req, res, next){
    let lat = req.body.latitude;
    let lon = req.body.longitude;
    let radius = req.body.radius;
    let results = await yelp.searchRestoByCoord(lat, lon, radius);
    //console.log(results.data);
    res.json(results.data.businesses);
});

apiRoutes.post('/api/buckeatlist/add', async function(req, res){
    console.log(req.user);
    let restaurantId = req.body.id;
    let userId = req.user.id;
    let name = req.body.name;
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
    await restaurant.addNew(name, yelpId, rating, price, lon, lat, city, address, website, reviewCount)
    let newRecord = await restaurant.getAllByYelpId(yelpId);
    let id = newRecord.id;
    await bucketlist.addNew(userId, id, 0);
    res.status('200').send('Item added');
});


apiRoutes.get('/api/users/:id/buckeatlist/', function(req, res, next){
    let userId = req.params.id;
    bucketlist.getBucketList(userId)
    .then(function(allRest){
        res.send(allRest);
    })
    .catch(function(error){})
})

// apiRoutes.post('/api/search/location', async function(req, res){
//     let searchStr = req.body.location;
//     let allCities = await zomato.searchCities(searchStr);
//     let response = [];
//     for (city of allCities){
//         let c = {
//             id: city.id,
//             name: city.name,
//             countryId: city.country_id,
//             countryName: city.country_name,
//             countryFlagUrl: city.country_flag_url,
//             stateId: city.state_id,
//             stateCode: city.state_code
//         };
//         response.push(c);
//     }
//     test();
//     res.json(response);
// })

apiRoutes.post('/api/search/restaurants', async function(req, res){
    let location = req.body.location;
    let response = await yelp.searchRestoByLocation(location);
    // let response = [];
    // for (city of allCities){
    //     let c = {
    //         id: city.id,
    //         name: city.name,
    //         countryId: city.country_id,
    //         countryName: city.country_name,
    //         countryFlagUrl: city.country_flag_url,
    //         stateId: city.state_id,
    //         stateCode: city.state_code
    //     };
    //     response.push(c);
    // }
    // test();
    console.log(response.data);
    res.json(response.data);
})

apiRoutes.post('/api/search/nearby', async function(req, res){
    let lat = 43.77809705059161 // req.body.lat;
    let lon = -79.41342294216157 // req.body.lon;
    let radius = 500;
    let response = await yelp.searchRestoByCoord(lat, lon, radius);
    // let response = [];
    // for (city of allCities){
    //     let c = {
    //         id: city.id,
    //         name: city.name,
    //         countryId: city.country_id,
    //         countryName: city.country_name,
    //         countryFlagUrl: city.country_flag_url,
    //         stateId: city.state_id,
    //         stateCode: city.state_code
    //     };
    //     response.push(c);
    // }
    // test();
    console.log(response.data);
    res.json(response.data);
})


apiRoutes.post('/api/search/business', async function(req, res){
    let businessId = req.body.location // req.body.businessId;
    let response = await yelp.getRestoDetail(businessId);
    // let response = [];
    // for (city of allCities){
    //     let c = {
    //         id: city.id,
    //         name: city.name,
    //         countryId: city.country_id,
    //         countryName: city.country_name,
    //         countryFlagUrl: city.country_flag_url,
    //         stateId: city.state_id,
    //         stateCode: city.state_code
    //     };
    //     response.push(c);
    // }
    // test();
    console.log(response.data);
    res.json(response.data);
})




module.exports = apiRoutes;