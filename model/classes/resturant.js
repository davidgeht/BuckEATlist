const connection =require("../../config/connection");

class Resturant {
    constructor(connection){
        this.connection=connection
    }
    addNew(name,yelp_id,rating, price, lang, lat, cuisine, city_id, address, website, review_count, hoursOfOp){
        return new Promise((resolve,reject)=>{
            let query =`INSERT INTO Resturant(name, yelp_id,rating, price, lang, lat, cuisine, menu, city_id, address,website, review_count, hoursOfOp)
            VALUES('${name}','${yelp_id}','${rating}','${price}','${lang}','${lat}','${cuisine}','${city_id}','${address}','${website}','${review_count}','${hoursOfOp}');`;
            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                // this.connection.end();
                resolve(res);
                console.log("New resturant record inserted");
            })
        })
    }
    getALLById(rest_id){
        return new Promise((resolve,reject)=>{
            let query=`SELECT * FROM Resturant WHERE id='${rest_id}';`;

            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                this.connection.end();
                resolve(res);
            })

        })
    }
    GetAllByLikeName(name){
        return new Promise((resolve,reject)=>{
            let query=`SELECT * FROM Resturant WHERE name LIKE %'${name}'%;`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                this.connection.end();
                resolve(res);
            })
        })
    }
    getByCityId(city_id){
        return new Promise((resolve, reject)=>{
            let query=`SELECT * FROM Resturant WHERE city_id='${city_id}';`;
            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                this.connection.end();
                resolve(res);
            })
        })
    }

    getRestIdByName(name){
        return new Promise ((resolve, reject)=>{
        let query=`SELECT id FROM RESTURANT WHERE name LIKE %'${name}'%;`;
        this.connection.query(query,(err,res)=>{
            if(err) throw err;
            this.connection.end();
            resolve(res);
            })
        })
    }

    getRating(rest_id){
    return new Promise((resolve, reject)=>{
        let query=`SELECT rating FROM Resturant WHERE rest_id='${rest_id}';`;
        this.connection.query(query,(err,res)=>{
            if(err) throw err;
            // this.connection.end();
            resolve(res);
        })
    })
    }

    getByCuisine(cuisine){
        return new Promise((resolve,reject)=>{
            let query=`SELECT * FROM Resturant WHERE cuisine='${cuisine}';`
            this.connection.query(query,(err,res)=>{
                if(err) throw err;
            //    this.connection.end()
                console.log(`All resturants based on ${cuisine}:`, res);
                return;
            })
        })
    }
    getByPriceRang(min,max){
        return new Promise((resolve,reject)=>{
            let query=`SELECT * FROM Resturant WHERE Price > '${min}' AND Price < '${max}';`;
            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                // this.connection.end()
                resolve(res);
            })
        })

    }

    getAllByYelpId(yelpId){
        return new Promise((resolve,reject)=>{
            let query=`SELECT * FROM Resturant WHERE yelp_id='${yelpId}';`;
            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                this.connection.end();
                resolve(res);
            })

        })
    }



}
module.exports = Resturant;