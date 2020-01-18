import { promises } from "dns";

class Image{
    constructor(connection){
        this.connection

    }
    addNew(user_id,rest_id, img_location){
        return new Promise((resolve,reject)=>{
            let query=`INSERT INTO Image(user_id,rest_id,img_location)
            VALUES('${user_id}','${rest_id}','${img_location}');`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                // this.connection.end();
                resolve(res);

            })
        })

    }
    getImage(id){
        return new promises((resolve,reject)=>{
            let query=`SELECT * FROM Image WHERE id='${id};`;
            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                // this.connection.end();
                resolve(res);
            })
        })
    }
}