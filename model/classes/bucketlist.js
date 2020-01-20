const connection = require("../../config/connection");

class Bucketlist{
    constructor(){
        this.connection = connection;
    }
    addNew(user_id,rest_id,visited){
        return new Promise((resolve,reject)=>{
            let query=`INSERT into Bucketlist (user_id,rest_id,visited)VALUES(${user_id}, ${rest_id},${visited});`;
            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                // this.connection.end();
                resolve(res);
            })
        })
    }
    getBucketlist(user_id){
        return new Promise((resolve, reject)=>{
            let query =`SELECT yelp_id FROM Bucketlist b 
            JOIN Restaurant r ON b.rest_id = r.id
            WHERE b.user_id ='${user_id}' AND b.visited = 0;`

            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                // this.connection.end();
                resolve(res);
            });
        });

    }

    getBucketlistAll(user_id){
        return new Promise((resolve, reject)=>{
            let query =`SELECT yelp_id FROM Bucketlist b 
            JOIN Restaurant r ON b.rest_id = r.id
            WHERE b.user_id ='${user_id}';`

            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                // this.connection.end();
                resolve(res);
            });
        });

    }

    getBucketlistExpanded(user_id){
        return new Promise((resolve, reject)=>{
            let query =`SELECT B.id, rest_id, visited, added_at, name, yelp_id, rating, price, lon, lat, city_name, address, website, review_count FROM Bucketlist as B
            left join Restaurant as R on B.rest_id = R.id
            WHERE user_id = ${user_id} AND visited = 0;`;

            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                // this.connection.end();
                resolve(res);
            });
        });
    }

    getVisited(user_id){
        return new Promise((resolve, reject)=>{
            let query =`SELECT B.id, rest_id, visited ,date_visited user_review, user_rating, name, yelp_id, rating, price, lon, lat, city_name, address, website, review_count 
            FROM Bucketlist as B
            left join Restaurant as R on B.rest_id = R.id
            WHERE user_id = ${user_id} AND visited = 1;`;

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
    updateRes(id,review,rating,date){
        return new Promise((resolve, reject)=>{
            let query =`UPDATE Bucketlist SET visited = 1, user_review='${review}',user_rating='${rating}' , date_visited='${date}' WHERE id=${id};`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                // this.connection.end();
                resolve(res);
            })

        })
    }
    updateReviewRating(review,rating){
        return new Promise((resolve,reject)=>{
            let query =`UPDATE Bucketlist SET user_review='${review}' AND user_rating='${rating}' ;`;
            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                resolve(res);
            })
        })
    }
    delRest(id){
        return new Promise((resolve, reject)=>{
            let query =`DELETE FROM Bucketlist WHERE id=${id};`;
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