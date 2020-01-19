const chai = require("chai");
const should = chai.should();
const rewire = require('rewire');
const assert = require('assert');
const expect = require('chai').expect;

const app = rewire('../public/js/helpers/validateSignup.js');

let validateInput = app.__get__('ValidateInput');
let testEmail = app.__get__('testEmail');
let testName = app.__get__('testName');
let testPassword = app.__get__('testPassword');

describe('Validate Input', function() {
    describe('Validate Password', function() {
        describe('Validate Password Length', function() {
            it('should return an error message when the password is less than 6 characters long', function() {
                let isValid = testPassword("Aa000");
                isValid.should.have.lengthOf.at.least(1);
            });
            it('should return "" when the password is greater than 5 characters long', function() {
                let isValid = testPassword("Aa000A");
                isValid.should.have.lengthOf(0);
            });
        });
        describe('Validate Password Composition', function() {
            it('should return an error message when the password has no numeric characters', function() {
                let isValid = testPassword("AaBbCc")
                isValid.should.have.lengthOf.at.least(1);
            });
            it('should return an error message when the password has no upper case letters', function() {
                let isValid = testPassword("aaa000");
                isValid.should.have.lengthOf.at.least(1);
            });
            it('should return an error message when the password has no lower case letters', function() {
                let isValid = testPassword("AAA000");
                isValid.should.have.lengthOf.at.least(1);
            });
            it('should return no error string when the password has at least 1 lower case letter, at least 1 upper character letter, at least 1 number and be at least 6 characters long', function() {
                let isValid = testPassword("Aa1!!!#$@#");
                isValid.should.have.lengthOf(0);
            });
        });
    });
    describe("Validate Names", function(){
        it("should return an error when the name has any invalid characters", function(){
            let isValid = testName("Michael@");
            isValid.should.have.lengthOf.at.least(1);
        });
        it("should return no error when the name has no invalid characters", function(){
            let isValid = testName("Mi- ch'ael");
            isValid.should.have.lengthOf(0);
        });
    });
    describe("Validate Email", function(){
        it("should return an error when the email address is invalid", function(){
            let isValid = testEmail("Michael");
            isValid.should.have.lengthOf.at.least(1);
        });
        it("should return no error when the email is valid", function(){
            let isValid = testEmail("test@test.com");
            isValid.should.have.lengthOf(0);
        });
    });
});