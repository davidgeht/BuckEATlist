// Controller code

const express = require("express");
const path = require("path");
//const User = require("TBD"); // TBD the model files
const Zomato = require("../../api/zomato"); // TBD for API file
const Yelp = require("../../api/yelp");
//const City = require("TBD"); // TBD the city file
//const Restaurant = require("TBD"); // TBD the model files
const passport = require("passport");
//let user = new User();
//let city = new City();
let zomato = new Zomato();
let yelp = new Yelp();

let checkUserExists = function(req, res, next){
    let email = req.body.email;
    if (!user.emailExists(email)) {
        return next();
    } else {
        res.send('ERROR: User with this email already exists');
    }
}

let test = async function(){
    let result1 = await zomato.searchRestaurantsByCoord(-79.413449,43.778126,100);
    console.log('result1');
    console.log(result1.data.restaurants);


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
    let searchStr = req.body.location;
    let allCities = await zomato.searchCities(searchStr);
    let response = [];
    for (city of allCities){
        let c = {
            id: city.id,
            name: city.name,
            countryId: city.country_id,
            countryName: city.country_name,
            countryFlagUrl: city.country_flag_url,
            stateId: city.state_id,
            stateCode: city.state_code
        };
        response.push(c);
    }
    test();
    res.json(response);
})

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

apiRoutes.get('/api/search/:locId/:cuisineId', async function(req, res){
    let locId = req.params.locId;
    let cuisineId = req.params.cuisineId;
    let restaurants = await zomato.searchRestaurants(locId, cuisineId);
    res.json(restaurants);
})



module.exports = apiRoutes;