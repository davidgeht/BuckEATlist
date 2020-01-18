
class User {
    constructor(id, username,encrypted_pw,emailaddress, firstname,lastname, fullname, homecity_id){
        this.id=id,
        this.username=username,
        this.encrypted_pw=encrypted_pw,
        this.emailaddress=emailaddress,
        this.firstname=firstname,
        this.lastname=lastname,
        this.fullname=fullname,
        this.homecity_id=homecity_id
    }
    async getAllUsers(){
        return new Promise((resolve,reject)=>{
            let query =`SELECT * FROM Users`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                connection.end();
                resolve(res);
            });
        });
    };
    getUserByID(id){
        return new Promise((resolve,reject)=>{
            let query=`SELECT U.id, username, encrypted_pw, emailaddress, 
            fullname, homecity_id from Users as u where U.id = ${id};`;

            this.connection.query(query, (err,res)=> {
                if(err) throw err;
                this.connection.end();
                resolve(res);
            });
        });
    }
    addNew(username,firstName, lastName, email, password){
        return new Promise((resolve, reject)=>{

            let query =`INSERT into Users(username, encrypted_pw, emailaddress, firstname, lastname) 
            VALUES ('${username}','${password}','${email}','${firstName}','${lastName}');`;

            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                this.connection.end();
                resolve(res);

            })
        })
    }
    emailExists(email){
        return new Promise((resolve, reject)=>{
            let query=`SELECT (*) FROM Users WHERE emailaddress = ${email};`

            this.connection.query(query,(err,res)=>{
                if(err) throw err;
                this.connection.end();
                if(res === !null){
                    return true
                }else{false};
                resolve(res)
            })
        })
    }
    verifyCredentials(login,password){
        return new Promise((resolve, reject)=>{
            let query=`SELECT (*) FROM USER WHERE username = ${login} AND encrypted_ps = ${password};`;
            this.connection.query(query,(err,res)=>{
                if (err) throw err;
                this.connection.end();
                if(res === !null){
                    return true;
                }else{
                    return false; };  

            })
        })
    }
}

module.exports = User;