const connection = require("../../config/connection");

class Cuisine {
    constructor(){
        this.connection = connection;
    }
    getAll(id){
        return new Promise((resolve,reject)=>{
            let query=` SELECT * FROM Cuisine WHERE id='${id}';`;
            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                resolve(res);
            })
        })
    }

    getByRest(restId){
        return new Promise((resolve,reject)=>{
            let query=` SELECT * FROM Cuisine WHERE rest_id=${restId};`;
            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                resolve(res);
            })
        })
    }

    getAllUser(id){
        return new Promise((resolve,reject)=>{
            let query =`SELECT C.id, rest_id, title, alias,name, yelp_id, rating, price, lon, lat, city_name, address, website, review_count FROM Cuisine as C 
            left join Restaurant as R on C.rest_id = R.id
            WHERE id ='${id}';`;
 
            this.connection.query(query,(err,res)=>{
                if(err) throw err;

                resolve(res);
            })
        })
    }


    addNew(rest_id, alias, title){
        return new Promise((resolve, reject)=>{
            let query=`INSERT INTO Cuisine(rest_id, alias, title)
            Values('${rest_id}','${alias}','${title}');`;

            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                    resolve(res);

            })
        })
    }
    updateById(id,rest_id,alias,title){
        return new Promise((resolve,reject)=>{
            let query=`UPDATE Cuisine SET rest_id='${rest_id}', alias='${alias}',title='${title}' WHERE id='${id}';`;
            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                resolve(res);
            })
        })
    }
    delById(id){
        return new Promise((resolve,reject)=>{
        let query=`DELETE FROM Cuisine WHERE id='${id}';`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                console.log(res +"has been deleted !");
                resolve(res);
            })

        })

    }
}

module.exports = Cuisine;