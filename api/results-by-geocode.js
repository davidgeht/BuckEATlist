const dotenv = require('dotenv').config();
var zomato = require('zomato-api');
const api = process.env.apiKey;
var client = zomato({
    userKey: api
});

client.getGeocode({lat: 49.267941, lon: -123.247360})
  .then(res => console.log(res.nearby_restaurants))
  .catch(err => console.log(err));
