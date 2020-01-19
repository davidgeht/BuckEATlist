// MySQL connection 

const mysql = require("mysql");

let connection;

if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL)
}else {      
if(!require('./testDB')){
  //local db
    connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "12345",
      database: "buckeatlist_db"
    });
}else{
  //test DB
  connection = mysql.createConnection(require('./testDB'));
}
};

// make connection
connection.connect(function(err){
    if(err){
        console.error("error connecting: "+ err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;
