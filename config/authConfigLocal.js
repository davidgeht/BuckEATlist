const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/classes/user"); //TBD
const bcrypt = require("bcryptjs");

let user = new User();
//var db = require("../models"); TBD

passport.use(new LocalStrategy(
    function(username, password, done) {
      user.getUserByEmail(username)
      .then(async function(userInfo){
        let result;
        if (userInfo.length < 1) {
          result = false;
        } else {
          console.log(userInfo);
          console.log(userInfo[0].encypted_pw);
          result = await bcrypt.compare(password, userInfo[0].encypted_pw);
          console.log(result);
        }
        if (!result) {
          return done(null, false, {message: 'Incorrect email or password'});
          } else {
            return done(null, user);
          }
      })
      .catch(function(err){
        throw err;
      })
    })); 


// TBD do I need this?

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
