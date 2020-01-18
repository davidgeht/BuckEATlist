const chai = require("chai");
const should = chai.should();
const rewire = require('rewire');
const app = rewire('../public/js/signup.js');

let validatePassword = app.__get__('ValidateInput');

describe('Validate Input', function() {
    describe('Validate Password Length', function() {
        it('should return false when the password is less than 6 characters long', function() {
            validatePassword.equal(validatePassword({password:"Aa000", firstName:"Michael",lastName:"Hrivnak",email:"valid@email.com"}), false);
        });
    });
});