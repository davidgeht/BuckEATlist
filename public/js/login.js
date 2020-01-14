$(document).ready(function(){
    $("form.login").on("submit", event => {
        event.preventdefault();

        let email = $("#email-input").value().trim();
        let pw = $("#password-input").value().trim();
    });
});
