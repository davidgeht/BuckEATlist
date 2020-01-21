const connection= require('../../config/connection');
class Provinces{
    constructor(){
        this.connection=connection;
    }
    addNew(name, country_id){
        return new Promise((resolve,reject)=>{
            let query=`INSERT INT0 Provinces(name, country_id)
            values('${name}','${country_id}');`;
            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                resolve(res);
            })
        })
    }

    getAll(id){
        return new Promise((resolve,reject)=>{
            let query=`SELECT * FROM Provinces WHERE id='${id}';`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                resolve(res);
            })
        })
    }
}

module.exports=Provinces;
