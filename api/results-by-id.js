const dotenv = require('dotenv').config();
var zomato = require('zomato-api');
const api = process.env.apiKey;
var client = zomato({
    userKey: api
});


client.getRestaurant({
res_id:"9186" // id of restaurant whose details are requested
}, function(err, result){
    if(!err){
      console.log(result);
    }else {
      console.log(err);
    }
});