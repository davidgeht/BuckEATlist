const key = "ztrC0_GI_M6D5IyWDQglLkh-H14Ksbty0PyqetKbEgyHnpT5ZCnqKdjoUmuVEnd2QgXSG96Kh4CDiGGMIRBf8Xfy0rCo1Sq7TIC6rm5rkuT6VIW_0QUqxuSO-2oiXnYx";
const axios = require('axios');


const config = { headers: {'Authorization': `Bearer ${key}`} }; 


class Yelp {
    constructor(){
    }

    async searchRestoByLocation(location) {
        let res = await axios.get(`https://api.yelp.com/v3/businesses/search?location=${location}&categories=restaurants`, config) 
        return res; 
    }

    async searchRestoByCoord(lat, lon, radius) {
        let res = await axios.get(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}&radius=${radius}&categories=restaurants`, config) 
        return res; 
    }

    async searchRestoByCoordAndTerm(lat, lon, radius, term) {
        let res = await axios.get(`https://api.yelp.com/v3/businesses/search?term=${term}&latitude=${lat}&longitude=${lon}&radius=${radius}&categories=restaurants`, config) 
        return res; 
    }

    async getRestoDetail(businessId) {
        let res = await axios.get(`https://api.yelp.com/v3/businesses/${businessId}`, config) 
        return res; 
    }

    async searchRestoByLocationAndTerm(location, term) {
        let res = await axios.get(`https://api.yelp.com/v3/businesses/search?location=${location}&term=${term}&categories=restaurants`, config) 
        return res; 
    }



}    

module.exports = Yelp;