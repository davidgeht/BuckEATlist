const connection = require('../../config/connection');

class User {
    constructor(){        
        this.connection = connection;
    }
    getAllUsers(){
        return new Promise((resolve,reject)=>{
            let query =`SELECT * FROM Users`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                resolve(res);
            });
        });
    };

    getUserByID(id){
        return new Promise((resolve,reject)=>{
            let query=`SELECT * from Users where id = ${id};`;
            this.connection.query(query, (err,res)=> {
                if(err) throw err;
                resolve(res);
            });
        });
    }

    getUserByEmail(email){
        return new Promise((resolve,reject)=>{
            let query=`SELECT * from Users where emailaddress = '${email}';`;
            
            this.connection.query(query, (err,res)=> {
                if(err) throw err;               
                resolve(res);
            });
        });
    }


    addNew(firstName, lastName, email, password){
        return new Promise((resolve, reject)=>{

            let query =`INSERT into Users(encrypted_pw, emailaddress, firstname, lastname) 
            VALUES ('${password}','${email}','${firstName}','${lastName}');`;

            this.connection.query(query,(err,res)=>{
                if (err) reject(err);
                resolve(res);
            })
        })
    }

    emailExists(email){
        return new Promise((resolve, reject)=>{
            let query=`SELECT * FROM Users WHERE emailaddress = '${email}';`

            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                console.log('res = ', res);
                let response;
                if(res.length >= 1){
                    response = true;
                }else{
                    response = false;
                };
                resolve(response);
            });
        });
    }
    updateById(password,email,firstname,lastname){
        return new Promise((resolve,reject)=>{
            let query=`UPDATE Users SET encrypted_pw='${password}', emailaddress='${email}',firstname='${firstname}',lastname='${lastname}' WHERE id='${id}'`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                resolve(res);
            })
        })
    }
    delById(id){
        return new Promise((resolve,reject)=>{
            let query=`DELETE FROM Users WHERE id='${id}';`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                console.log(res +"has been deleted !");
                resolve(res);
            })

        })
    }
}

module.exports = User;