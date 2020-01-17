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
}

module.exports = Zomato;