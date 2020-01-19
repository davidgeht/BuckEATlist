const connection = require("../../config/connection");

class Bucketlist{
    constructor(){
        this.connection = connection;
    }
    addNew(user_id,rest_id,visited){
        return new Promise((resolve,reject)=>{
            let query=`INSERT into Bucketlist(user_id,rest_id,visited)VALUES(${user_id}, ${rest_id},${visited});`;
            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                // this.connection.end();
                resolve(res);
            })
        })
    }
    getBucketList(user_id){
        return new Promise((resolve, reject)=>{
            let query =`SELECT * FROM Bucketlist WHERE user_id ='${user_id}' AND visited = 0;`

            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                // this.connection.end();
                resolve(res);
            });
        });

    }

    getBucketListExpanded(user_id){
        return new Promise((resolve, reject)=>{
            let query =`SELECT B.id, rest_id, visited, added_at, name, yelp_id, rating, price, lon, lat, city_name, address, website, review_count FROM bucketlist as B
            left join restaurant as R on B.rest_id = R.id
            WHERE user_id = ${user_id} AND visited = 0;`;

            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                // this.connection.end();
                resolve(res);
            });
        });
    }

    getVisitedList(user_id){
        return new Promise((resolve, reject)=>{
            let query =`SELECT rest_id FROM Bucketlist WHERE user_id='${user_id}' AND visited = 1;`

            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                // this.connection.end();
                resolve(res);
            })
        })
    }
    updateRes(id){
        return new Promise((resolve, reject)=>{
            let query =`UPDATE Bucketlist SET visited = 1 WHERE id='${id}';`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                // this.connection.end();
                resolve(res);
            })

        })
    }
    delRest(id){
        return new Promise((resolve, reject)=>{
            let query =`DELETE FROM Bucketlist WHERE id='${id}';`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                // this.connection.end();
                console.log(res +"has been deleted !");
                resolve(res);
            })
        })
    }

}

module.exports = Bucketlist;