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
            username: email,
            password: pw
        };
        
        $.post("/api/login", loginObj)
        .then(function (response) {
            console.log('And the response is:... ',response)
            window.location.replace("/home");        
        }).catch(err => {
            console.log(err.status);
            if (err.status === 401) {
                window.alert('Invalid user or password');
            }
        });
    });
});
