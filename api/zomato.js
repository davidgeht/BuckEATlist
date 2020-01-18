const dotenv = require('dotenv').config();
const zomato = require('zomato-api');
const api = "66cd995973974f6f20bb4c3fa27cddeb";
const axios = require('axios');
const client = zomato({
        userKey: api
    })

const config = { headers: {'user-key': "66cd995973974f6f20bb4c3fa27cddeb"} }; 


class Zomato {
    constructor(){
        this.apiKey = api;
        this.client = client;
    }

    async searchCities(str) {
        let res = await axios.get(`https://developers.zomato.com/api/v2.1/cities?q=${str}`, config) 
        return res.data.location_suggestions; 
    }

    async searchRestaurantsByCity(cityId) {
        let res = await axios.get(`https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city`, config) 
        return res; 
    }

    async searchRestaurantsByCoord(lon, lat, radius) {
        let res = await axios.get(`https://developers.zomato.com/api/v2.1/search?lat=${lat}&lon=${lon}&radius=${radius}`, config) 
        return res; 
    }

    async searchRestaurantsByCity(cityId) {
        let res = await axios.get(`https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city`, config) 
        return res; 
    }
}    

module.exports = Zomato;