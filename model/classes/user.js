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
                //connection.end();
                resolve(res);
            });
        });
    };
   getUserByID(id){
        return new Promise((resolve,reject)=>{
            let query=`SELECT U.id, username, encypted_pw, emailaddress, 
            fullname, homecity_id from Users as u where U.id = ${id};`;

            this.connection.query(query, (err,res)=> {
                if(err) throw err;
                //this.connection.end();
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
                //this.connection.end();
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
                //this.connection.end();
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

    verifyCredentials(login,password){
        return new Promise((resolve, reject)=>{
            let query=`SELECT * FROM USER WHERE username = ${login} AND encrypted_ps = ${password};`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                //this.connection.end();
                if(res === !null){
                    return true;
                }else{
                    return false; };  

            })
        })
    }
}

module.exports = User;