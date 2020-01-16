const dotenv = require('dotenv').config();
var zomato = require('zomato-api');
const api = process.env.apiKey
var client = zomato({
    userKey: api
})

client.getCities({
    q:"London", //query by city name
    }).then(res => console.log(res.location_suggestions))
    .catch(err => console.log(err));

