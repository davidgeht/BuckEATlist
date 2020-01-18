
function ValidateInput(obj){

    let result = "";
    const {firstName, lastName, email, password} = obj;
            
    result += testEmail(email);
    result += testName(firstName);
    result += testName(lastName);
    result += testPassword(password);
    
    return result
    
}

function testPassword(pw){
    const pwRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,50}/;
    
    if(!pwRegex.test(pw)){
        return "*passwords need at least 1 lower case letter, 1 upper case letter, 1 number and is at least 6 characters long\n";
    }
    return "";
}

function testName(name){
    const nameRegx = /^[^#&<>\"~;$@^%*{}?]{1,50}$/g;
    if(!nameRegx.test(name)){
        return "*invalid name (unallowed characters or over 50 characters)\n";
    }
    return "";
}
function testEmail(email){
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if(!emailRegex.test(email)){
        return "*invalid email address\n";
        
    }
    return "";
}