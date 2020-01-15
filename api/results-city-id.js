const dotenv = require('dotenv').config();
var zomato = require('zomato-api');
const api = process.env.apiKey
var client = zomato({
    userKey: api
})

client.search({
    city_id:"280",//Search Keyword
    cuisines : "55",  //list of cuisine id's separated by comma
    count:"3",
    start:"1"
}).then(res => console.log(res.restaurants))
.catch(err => console.log(err));