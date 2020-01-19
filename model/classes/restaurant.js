const connection = require("../../config/connection");

class Restaurant {
    constructor(){
        this.connection = connection
    }
    addNew(name,yelp_id,rating, price, lon, lat, city_name, address, website, review_count){
        return new Promise((resolve,reject)=>{
            let query =`INSERT INTO Restaurant(name, yelp_id,rating, price, lon, lat, city_name, address,website, review_count)
            VALUES('${name}','${yelp_id}',${rating},'${price}',${lon},${lat}, '${city_name}','${address}','${website}',${review_count});`;
            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                // this.connection.end();
                resolve(res);
                console.log("New restaurant record inserted");
            })
        })
    }
    getALLById(rest_id){
        return new Promise((resolve,reject)=>{
            let query=`SELECT * FROM Restaurant WHERE id='${rest_id}';`;

            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                this.connection.end();
                resolve(res);
            })

        })
    }
    GetAllByLikeName(name){
        return new Promise((resolve,reject)=>{
            let query=`SELECT * FROM Restaurant WHERE name LIKE '%${name}%';`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                this.connection.end();
                resolve(res);
            })
        })
    }
    getByCityId(city_id){
        return new Promise((resolve, reject)=>{
            let query=`SELECT * FROM Restaurant WHERE city_id='${city_id}';`;
            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                this.connection.end();
                resolve(res);
            })
        })
    }

    getRestIdByName(name){
        return new Promise ((resolve, reject)=>{
        let query=`SELECT id FROM Restaurant WHERE name LIKE %'${name}'%;`;
        this.connection.query(query,(err,res)=>{
            if(err) throw err;
            this.connection.end();
            resolve(res);
            })
        })
    }

    getRating(rest_id){
    return new Promise((resolve, reject)=>{
        let query=`SELECT rating FROM Restaurant WHERE rest_id='${rest_id}';`;
        this.connection.query(query,(err,res)=>{
            if(err) throw err;
            // this.connection.end();
            resolve(res);
        })
    })
    }

    getByCuisine(cuisine){
        return new Promise((resolve,reject)=>{
            let query=`SELECT * FROM Restaurant WHERE cuisine='${cuisine}';`
            this.connection.query(query,(err,res)=>{
                if(err) throw err;
            //    this.connection.end()
                console.log(`All restaurants based on ${cuisine}:`, res);
                return;
            })
        })
    }
    getByPriceRang(min,max){
        return new Promise((resolve,reject)=>{
            let query=`SELECT * FROM Restaurant WHERE Price > '${min}' AND Price < '${max}';`;
            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                // this.connection.end()
                resolve(res);
            })
        })

    }

    getAllByYelpId(yelpId){
        return new Promise((resolve,reject)=>{
            let query=`SELECT * FROM Restaurant WHERE yelp_id='${yelpId}';`;
            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                resolve(res);
            })

        })
    }



}
module.exports = Restaurant;