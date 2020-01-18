class Cities{
    constructor(id, name, province_id,){
        this.id=id,
        this.name=name,
        this.province_id=province_id
    }
    addNew(name,province_id){
        return new Promise((resolve,reject)=>{
            let query=`INSERT INTO Cities(name, province_id) VALUES('${name}','${province_id}');`;

            connection.query(query,(err,res)=>{
                if (err) throw err;
                connection.end();
                
            })
        })
    }
    FindByName(name){
        return new Promise((resolve, reject)=>{
            let query =`Select * FROM Cities WHERE name LIKE %${name}%;`;

            connection.query(query,(err,res)=>{
                if (err) throw err;
                connection.end();
                resolve(res);
            })
        })
    }
    getCityId(name){
        return new Promise((resolve,reject)=>{
            let query =`SELECT id FROM Cities WHERE name=${name}; `

            this.connection.query(query,(err,res)=>
            if (err) throw err;
            this.connection.end();
            resolve(res);
            })
        }) 
    }
    
}
module.exports= Cities;
