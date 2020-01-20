const dotenv = require('dotenv').config();
const zomato = require('zomato-api');
const api = "66cd995973974f6f20bb4c3fa27cddeb";
const client = zomato({
        userKey: api
    })



client.getLocations({query: 'Toronto'})
.then(res => console.log(res))
.catch(err => console.log(err));

client.getLocations({query: 'London'})
.then(res => console.log(res))
.catch(err => console.log(err));

client.getLocations({query: 'Tokyo'})
.then(res => console.log(res))
.catch(err => console.log(err));


