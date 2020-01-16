const connection = require("./connection");

function printQuestionMarks(num){
    let arr = [];

    for (let i = 0; i <num; i++){
        arr.push("?");
    }

    return arr.toString();
}

//