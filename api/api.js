const dotenv = require('dotenv').config();
var zomato = require('zomato-api');
const api = process.env.apiKey;
var client = zomato({
    userKey: api
});

//search nearby restaurants//

client.getGeocode({lat: 49.267941, lon: -123.247360})
  .then(res => console.log(res.nearby_restaurants))
  .catch(err => console.log(err));

//search by location id, location type and establishment//

client.search({
    entity_id:"36932",//location id
    entity_type:"group",//define the type of the location
    establishment_type : "" //estblishment id obtained from establishments call
}).then(res => console.log(res.restaurants))
.catch(err => console.log(err));

//search by cuisines type, id and location//

client.search({
    entity_id:"36932",//location id
    entity_type:"group",//define the type of the location
    cuisines: "55"  //list of cuisine id's or type separated by comma
}).then(res => console.log(res.restaurants))
.catch(err => console.log(err));


//search by cities to get city id//


client.getCities({
    q:"London", //query by city name
    }).then(res => console.log(res.location_suggestions))
    .catch(err => console.log(err));


//search by name of the restaurant//

client.search({
    q:"Cafe", //search by the keyword of the restaurant
}).then(res => console.log(res.restaurants))
.catch(err => console.log(err));

//search by id of the restaurant to get detail//

client.getRestaurant({
    res_id:"9186" // id of restaurant whose details are requested
    }, function(err, result){
        if(!err){
          console.log(result);
        }else {
          console.log(err);
        }
    });