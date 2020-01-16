const chai = require("chai");
const should = chai.should();
const rewire = require('rewire');
const app = rewire('../public/js/login.js');

let validatePassword = app.__get__('');