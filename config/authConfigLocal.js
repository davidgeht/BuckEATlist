const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const model = require(""); //TBD

//var db = require("../models"); TBD

passport.use(new LocalStrategy(
    function(username, password, done) {
      model.User.findOne({ username: username }, function (err, user) {
        if (err) {
            return done(err); 
        }
        if ((!user) || (!user.verifyPassword(password))) {
            return done(null, false, {message: 'Incorrect email or password'});
        } // TBD the ORM methods
        return done(null, user);
      });
    }
  ));



passport.use(new LocalStrategy(
  {
    usernameField: "email"
  },
  function(email, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

// TBD do I need this?

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
