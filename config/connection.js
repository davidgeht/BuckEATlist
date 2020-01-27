// MySQL connection 
const mysql = require("mysql");
let connection;
if(process.env.JAWSDB_URL){
    connection = mysql.createPool(process.env.JAWSDB_URL)
}else {      
  if(!require('./testDB')){
    //local db
      connection = mysql.createPool({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "mqEl3Ar4pQi^JcE4",
        database: "buckeatlist_db",
        connectionLimit: 100
      });
  }else{
    //test DB
    connection = mysql.createPool(require('./testDB'));
  }
};
// make connection
// connection.connect(function(err){
//     if(err){
//         console.error("error connecting: "+ err.stack);
//         return;
//     }
//     console.log("connected as id " + connection.threadId);
// });
module.exports = connection;
