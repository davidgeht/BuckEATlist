class Bucketlist{
    constructor(id, user_id,rest_id,visited){
        this.id=id,
        this.user_id=user_id,
        this.rest_id=rest_id,
        this.visited=visited
    }
    addNew(user_id,rest_id,visited){
        return new Promise((resolve,reject)=>{
            let query=`INSERT into Bucketlist(user_id,rest_id,visited)VALUES('${user_id}','${rest_id}','${visited}');`;
            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                this.connection.end();
                resolve(res);
            })
        })
    }
    getBucketList(user_id){
        return new Promise((resolve, reject)=>{
            let query =`SELECT Rest_id FROM Bucketlist WHERE user_id =${user_id} AND visited = FALSE;`

            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                this.connection.end();
                resolve(res);
            })
        })

    }

    getVisitedList(user_id){
        return new Promise((resolve, reject)=>{
            let query =`SELECT rest_id FROM Bucketlist WHERE user_id=${user_id} AND visited = TRUE;`

            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                this.connection.end();
                resolve(res);
            })
        })
    }
}

module.exports = Bucketlist;