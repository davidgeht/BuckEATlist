const connection = require("../../config/connection");

class Cities{
    constructor(connection){
        this.connection=connection
        
    }
    addNew(name,province_id){
        return new Promise((resolve,reject)=>{
            let query=`INSERT INTO Cities(name, province_id) VALUES('${name}','${province_id}');`;

            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                // this.connection.end();
                resolve(res)

            })
        })
    }
    FindByName(name){
        return new Promise((resolve, reject)=>{
            let query =`Select * FROM Cities WHERE name LIKE %'${name}'%;`;

            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                // this.connection.end();
                resolve(res);
            })
        })
    }
    getCityId(name){
        return new Promise((resolve,reject)=>{
            let query =`SELECT id FROM Cities WHERE name='${name}'; `;

            this.connection.query(query,(err,res)=>{
            if (err) throw err;
            // this.connection.end();
            resolve(res);
            })
        }) 
    }
    
}
module.exports= Cities;
