var errorMessage = "";
$("#signupForm").on("submit", event => {
    event.preventDefault();
    console.log("hi");
    let email = $("#email-input").val().trim();
    let pw = $("#password-input").val().trim();
    let firstName = $("#firstname-input").val().trim();
    let lastName = $("#lastname-input").val().trim();
    
    let alert = $("#alert");

    if(!email || !pw || !firstName || !lastName){
        alert.text("Please enter all required information");
        alert.show();
        return;
    }        
    let signupObj = {
        email: email,
        password: pw,
        firstName: firstName,
        lastName: lastName
    };
    
    errorMessage = ValidateInput(signupObj);

    if(errorMessage.length > 0){
        alert.html(errorMessage);
        alert.show();
        return;
    }

    $.post("/api/signup", signupObj)
    .then(function (res) {
        window.location.replace("/login");        
    }).catch(err => {
        alert.text(err.responseText);
        alert.show();
    });           
});

