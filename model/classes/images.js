import { promises } from "dns";

class Image{
    constructor(c){
        this.connection

    }
    addNew(user_id,rest_id, img_location){
        return new Promise((resolve,reject)=>{
            let query=`INSERT INTO Image(bucketlist_id, user_id,rest_id, img_location)
            VALUES('${bucketlist_id}','${user_id}','${rest_id}','${img_location}');`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                // this.connection.end();
                resolve(res);

            })
        })

    }
    getImage(id){
        return new promises((resolve,reject)=>{
            let query=`SELECT * FROM Image WHERE id='${id}';`;
            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                // this.connection.end();
                resolve(res);
            })
        })
    }

    getImageLocation(id){
        return new Promise((resolve,reject)=>{
            let query=`SELECT img_location FROM Image WHERE id='${id}';`;
            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                resolve(res);
            })
        })
    }
    updateById(id,bucketlist_id, user_id,rest_id, img_location){
        return new Promise((resolve,reject)=>{
            let query=`UPDATE Image SET img_location='${img_location}',user_id='${user_id}', rest_id='${rest_id}',bucketlist_id='${bucketlist_id}' WHERE id='${id}';`;
            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                resolve(res);
            })
        })
    }
    delById(id){
        return new Promise((resolve,reject)=>{
            let query=`DELETE FROM Image WHERE id='${id}';`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                console.log(res +"has been deleted !");
                resolve(res);
            })

        })
    }
}

module.exports=Image;