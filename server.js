const express = require("express");
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});
const path = require("path");
const passport = require("passport");
const apiRoutes = require("./controller/routes/api-routes");
const htmlRoutes = require("./controller/routes/html-routes");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public', 'views'));
app.engine("handlebars", exphbs({ defaultLayout: "main" })); //selects a specific engine of an app
app.set("view engine", "handlebars");
app.use(session({ 
  secret: 'something', 
  cookie: { 
      secure: false
  }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

module.exports = app