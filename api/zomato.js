const dotenv = require('dotenv').config();
const zomato = require('zomato-api');
const api = "66cd995973974f6f20bb4c3fa27cddeb";
const client = zomato({
        userKey: api
    })


class Zomato {
        constructor(){
            this.apiKey = api;
            this.client = client;
        }
        
        async getCitiesByStr(str) {
            try {
                res = await this.client.getCities({
                    q:str, //query by city name
                    });
                return res.location_suggestions;
            } catch (err) {
                throw 'Error calling API: '+err;
            }
        }

        //search nearby restaurants//

        async getGeocode(lat, lon) {
            try {
                res = await this.client.getGeocode({
                    lat: lat,
                    lon: lon //query by geocode
                    });
                return res.nearby_restaurants;
            } catch (err) {
                throw 'Error calling API: '+err;
            }
        }

        //search by location id, location type and establishment//


        async searchRestaurantsByType(entityId, entityType, estTypeId) {
            try {
                res = await this.client.search({
                    entity_id: entityId,//location id
                    entity_type: entityType,//define the type of the location
                    establishment_type: estTypeId //estblishment id obtained from establishments call
                    });
                return res.restaurants;
            } catch (err) {
                throw 'Error calling API: '+err;
            }
        }

        //search by cuisines type, id and location//
   

        async searchRestaurantsByCuisine(entityId, cuisine, estTypeId) {
            try {
                res = await this.client.search({
                    entity_id: entityId,//location id
                    entity_type: estTypeId,//define the type of the location
                    cuisines: cuisine  //list of cuisine id's or type separated by comma
                    });
                return res.restaurants;
            } catch (err) {
                throw 'Error calling API: '+err;
            }
        }


        //search by id of the restaurant to get detail//

       
        async getRestaurant(str) {
            try {
                res = await this.client.getRestaurant({
                        res_id:str // id of restaurant whose details are requested
                    });
                return res;
            } catch (err) {
                throw 'Error calling API: '+err;
            }
        }

        //search by name of the restaurant//
  

        async searchRestoByName(str) {
            try {
                res = await this.client.search({
                    q:str //keyword to search restaurant
                    });
                return res.restaurants;
            } catch (err) {
                throw 'Error calling API: '+err;
            }
        }

        async searchLocations(str) {
            try {
                let res = await this.client.getLocations({
                    query: str,
                    count: 20 //keyword to search restaurant
                    });
                    console.log('zomato_response');
                    console.log(res);
                    return res;
            } catch (err) {
                throw 'Error calling API: '+err;
            }
        }

    }

module.exports = Zomato;