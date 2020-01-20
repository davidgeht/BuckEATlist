// MySQL connection 
const mysql = require("mysql");
let connection;
if(process.env.JAWSDB_URL){
<<<<<<< HEAD
    connection = mysql.createConnection(process.env.JAWSDB_URL)
}else {      
  if(!require('./testDB')){
    //local db
      connection = mysql.createConnection({
=======
    connection = mysql.createPool(process.env.JAWSDB_URL)
}else {      
  if(!require('./testDB')){
    //local db
      connection = mysql.createPool({
>>>>>>> ea0335ce1f11ac4452da32e595df58d6697fe63f
        host: "localhost",
        port: 3306,
        user: "root",
        password: "mqEl3Ar4pQi^JcE4",
        database: "buckeatlist_db"
      });
  }else{
    //test DB
<<<<<<< HEAD
    connection = mysql.createConnection(require('./testDB'));
=======
    connection = mysql.createPool(require('./testDB'));
>>>>>>> ea0335ce1f11ac4452da32e595df58d6697fe63f
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