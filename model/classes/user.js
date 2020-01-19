const connection = require('../../config/connection');

class User {
    constructor(){
        this.connection = connection
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
<<<<<<< HEAD
            let query=`SELECT U.id, username, encypted_pw, emailaddress, 
            fullname, homecity_id from Users as u where U.id = ${id};`;
=======
            let query=`SELECT U.id, username, encrypted_pw, emailaddress, 
            fullname, homecity_id from Users as u where U.id = '${id}';`;
>>>>>>> e6df7c383969885523c064cab29c086c46ed0132

            this.connection.query(query, (err,res)=> {
                if(err) throw err;
                resolve(res);
            });
        });
    }

    getUserByEmail(email){
        return new Promise((resolve,reject)=>{
            let query=`SELECT U.id, username, encypted_pw, emailaddress, 
            fullname, homecity_id from Users as u where U.username = '${email}';`;

            this.connection.query(query, (err,res)=> {
                if(err) throw err;
                //this.connection.end();
                resolve(res);
            });
        });
    }


    addNew(firstName, lastName, email, password){
        return new Promise((resolve, reject)=>{

            let query =`INSERT into Users(username, encypted_pw, emailaddress, firstname, lastname) 
            VALUES ('${email}','${password}','${email}','${firstName}','${lastName}');`;

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
                    response = true
                }else{
                    response = false
                };
                resolve(response)
            })
        })
    }

    getUserByEmail(email){
        return new Promise((resolve,reject)=>{
            let query=`SELECT * FROM USER WHERE emailaddress='${email}';`;

            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                this.connection.end();
                resolve(res)
            })
        })
    }
}

module.exports = User;