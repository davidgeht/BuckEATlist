$(document).ready(function(){
   
    console.log("page is ready");
    $("#loginForm").submit( event => {
        event.preventDefault();
        console.log("hi");
        let email = $("#email-input").val().trim();
        let pw = $("#password-input").val().trim();

        let alert = $("#alert");

        if(!email || !pw){
            alert.text("Please enter your email and password");
            alert.show();
            return false;
        }

        let loginObj = {
            email: email,
            password: pw
        };
        
        $.post("/api/login", loginObj)
        .then(function () {
            window.location.replace("/home");        
        }).catch(err => {
            alert.text(err);
            alert.show();
        });
    });
});
