const connection=require('../../config/connection');
class Country{
    constructor(){
        this.connection=connection;

    }
    addNew(name,currency){
        return new Promise((resolve,reject)=>{
            let query=`INSERT INTO Countries(name, currency)
            values('${name}','${currency}');`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                resolve(res);
            })
        })
    }
    getAll(id){
        return new Promise((resolve,reject)=>{
        let query=`SELECT * FROM Countries WHERE id='${id}';`;
        this.connection.query(query,(err,res)=>{
            if(err) throw err;
            resolve(res);
            
            })
        })
    }
    updateById(id,name,currency){
        return new Promise((resolve,reject)=>{
            let query=`UPDATE Countries Set name='${name}',currency ='${currency}' WHERE id ='${id}';`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                resolve(res);
            })
        })
    }
    delById(id){
        return new Promise((resolve,reject)=>{
            let query=`DELETE FROM Countries WHERE id='${id}';`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                console.log(res +"has been deleted !");
                resolve(res);
            })

        })
    }
}

module.exports=Country;