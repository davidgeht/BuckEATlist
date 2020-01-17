const dotenv = require('dotenv').config();
const zomato = require('zomato-api');
const api = process.env.apiKey;
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

        async getGeocode(num, num) {
            try {
                res = await this.client.getGeocode({
                    lat:num,
                    lon:num //query by geocode
                    });
                return res.nearby_restaurants;
            } catch (err) {
                throw 'Error calling API: '+err;
            }
        }

        //search by location id, location type and establishment//


        async search(str,str,str) {
            try {
                res = await this.client.search({
                    entity_id:str,//location id
                    entity_type:str,//define the type of the location
                    establishment_type:str //estblishment id obtained from establishments call
                    });
                return res.restaurants;
            } catch (err) {
                throw 'Error calling API: '+err;
            }
        }

        //search by cuisines type, id and location//
   

        async search(str, str, str) {
            try {
                res = await this.client.search({
                    entity_id:str,//location id
                    entity_type:str,//define the type of the location
                    cuisines:str  //list of cuisine id's or type separated by comma
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
  

        async search(str) {
            try {
                res = await this.client.search({
                    q:str //keyword to search restaurant
                    });
                return res.restaurants;
            } catch (err) {
                throw 'Error calling API: '+err;
            }
        }

    }
    module.exports = Zomato;