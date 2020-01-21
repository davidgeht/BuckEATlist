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
    updateById(id,name,country_id){
        return new Promise((resolve,reject)=>{
            let query=`UPDATE Provinces Set name='${name}', country_id ='${country_id}' WHERE id ='${id}';`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                resolve(res);
            })
        })
    }
    delById(id){
        return new Promise((resolve,reject)=>{
            let query=`DELETE FROM Provinces WHERE id='${id}';`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                console.log(res +"has been deleted !");
                resolve(res);
            })

        })
    }
}

module.exports=Provinces;
