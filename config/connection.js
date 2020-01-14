// MySQL connection 
const mysql = require("mysql");

const connection = mysql.createConnection({
    host:"	vvfv20el7sb2enn3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "k10z785h59k7vpca",
    password:"l099b71kdlrfhzir",
    database:"et85mzsa1tojmca9"
});

// make connection
connection.connect(function(err){
    if(err){
        console.error("error connecting: "+ err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;
