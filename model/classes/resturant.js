class Resturant {
    constructor(id, name, yelp_id, rating, price, lang, lat, cuisine, city_id, address, website, review_count){
        this.id=id,
        this.name=name,
        this.yelp_id=yelp_id,
        this.rating=rating,
        this.price= price,
        this.lang=lang,
        this.lat=lat,
        this.cuisine=cuisine,
        this.city_id=city_id,
        this.address=address,
        this.website=website,
        this.review_count=review_count,
        this.hoursOfOp=hoursOfOp,
    }

    addNew(name,yelp_id,rating, price, lang, lat, cuisine, city_id, address, website, review_count, hoursOfOp,){
        return new Promise((resolve,reject)=>{
            let query =`INSERT INTO Resturant(name, zomato_id,rating, price, lang, lat, cuisine, menu, city_id, address, cost_for_2, website, review_count, hoursOfOp, highlights)
            VALUES('${name}','${yelp_id}','${rating}','${price}','${lang}','${lat}','${cuisine}','${city_id}','${address}','${website}','${review_count}','${hoursOfOp}');`;
            connection.query(query,(err,res)=>{
                if(err) throw err;
                connection.end();
                resolve(res);
                console.log("New resturant record inserted");
            })
        })
    }
    getALLById(rest_id){
        return new Promise((resolve,reject)=>{
            let query=`SELECT * FROM Resturant WHERE id=${rest_id};`;

            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                this.connection.end();
                resolve(res);
            })

        })
    }
    GetAllByLikeName(name){
        return new Promise((resolve,reject)=>{
            let query=`SELECT * FROM Resturant WHERE name LIKE %${name}%;`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                this.connection.end();
                resolve(res);
            })
        })
    }
    getByCityId(city_id){
        return new Promise((resolve, reject)=>{
            let query=`SELECT * FROM Resturant WHERE city_id=${city_id};`;
            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                this.connection.end();
                resolve(res);
            })
        })
    }

    getRestIdByName(name){
        return new Promise ((resolve, reject)=>{
        let query=`SELECT id FROM RESTURANT WHERE name LIKE %${name}%;`;
        this.connection.query(query,(err,res)=>{
            if(err) throw err;
            this.connection.end();
            resolve(res);
            })
        })
    }

    getRating(rest_id){
    return new Promise((resolve, reject)=>{
        let query=`SELECT rating FROM Resturant WHERE rest_id=${rest_id};`;
        this.connection.query(query,(err,res)=>{
            if(err) throw err;
            this.connection.end();
            resolve(res);
        })
    })
    }

    getByCuisine(cuisine){
        return new Promise((resolve,reject)=>{
            let query=`SELECT * FROM Resturant WHERE cuisine=${cuisine};`
            connection.query(query,(err,res)=>{
                if(err) throw err;
                connection.end()
                console.log(`All resturants based on ${cuisine}:`, res);
                return;
            })
        })
    }
    getByPriceRang(min,max){
        return new Promise((resolve,reject)=>{
            let query=`SELECT * FROM Resturant WHERE Price > ${min} AND Price < ${max};`;
            connection.query(query,(err,res)=>{
                if(err) throw err;
                connection.end()
                res

            })
        })

    }





}
module.exports = Resturant;