var errorMessage = "";

$(document).ready(function(){

    $("form.signup").on("submit", event => {
        event.preventdefault();

        let email = $("#email-input").value().trim();
        let pw = $("#password-input").value().trim();
        let firstName = $("#firstname-input").value().trim();
        let lastName = $("#lastname-input").value().trim();
        
        let alert = $("#alert");

        if(!email || !pw || !firstName || !lastName){
            alert.text("Please enter all required information");
            alert.show();
            return false;
        }        

        let signupObj = {
            email: email,
            password: pw,
            firstName: firstName,
            lastName: lastName
        };
        
        if(!ValidateInput(signupObj)){
            alert.text(errorMessage);
            alert.show();
        }
        
        $.post("/api/signup", signupObj)
        .then(function () {
            window.location.replace("/home");        
        }).catch(err => {
            alert.text(err);
            alert.show();
        });           
    });
});

function ValidateInput(obj){
    
    const emailRegex = /\A[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\z/;
    const nameRegx = /\b[A-Za-z- ]+\b/;
    const pwRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    const {firstName, lastName, email, password} = obj;
            
    result = true;

    if(!emailRegex.test(email)){
        errorMessage += "invalid email address\n";
        result = false;
    }
    if(nameRegx.test(firstName)){
        errorMessage += "invalid first name (unallowed characters)\n";
        result = false;
    }
    if(nameRegx.test(lastName)){
        errorMessage += "invalid first name (unallowed characters)\n";
        result = false;
    }

    if(pwRegex.test(password)){
        errorMessage += "passwords need at least 1 lower case letter, 1 upper case letter, 1 number and is at least 6 characters long";
        result = false;
    }

    return result
    
}