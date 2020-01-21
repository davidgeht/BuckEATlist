const connection = require("../../config/connection");

class Cities{
    constructor(){
        this.connection=connection
        
    }
    addNew(name,province_id){
        return new Promise((resolve,reject)=>{
            let query=`INSERT INTO Cities(name, province_id) VALUES('${name}','${province_id}');`;

            this.connection.query(query,(err,res)=>{
                if (err) throw err;
              
                resolve(res)

            })
        })
    }
    findByName(name){
        return new Promise((resolve, reject)=>{
            let query =`Select * FROM Cities WHERE name LIKE %'${name}'%;`;

            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                
                resolve(res);
            })
        })
    }
    getCityId(name){
        return new Promise((resolve,reject)=>{
            let query =`SELECT id FROM Cities WHERE name='${name}'; `;

            this.connection.query(query,(err,res)=>{ 
            if (err) throw err;
          
            resolve(res);
            })
        }) 
    }
    
    updateById(id,name,province_id){
        return new Promise((resolve,reject)=>{
            let query=`UPDATE Cities Set name='${name}',province_id='${province_id}' WHERE id ='${id}';`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                resolve(res);
            })
        })
    }
    delById(id){
        return new Promise((resolve,reject)=>{
            let query=`DELETE FROM Cities WHERE id='${id}';`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                console.log(res +"has been deleted !");
                resolve(res);
            })

        })
    }
    
}
module.exports= Cities;
