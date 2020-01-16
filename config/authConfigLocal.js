const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const model = require(""); //TBD

let user = new User();
//var db = require("../models"); TBD

passport.use(new LocalStrategy(
    function(user, password, done) {
      let result = user.verifyCredentials(user, password);
      if (!result) {
        return done(null, false, {message: 'Incorrect email or password'});
        } else {
          return done(null, user);
        }
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
