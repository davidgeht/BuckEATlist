const express = require("express");
const path = require("path");
const apiRoutes = require("./controller/routes/api-routes");
const htmlRoutes = require("./controller/routes/html-routes");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.engine("handlebars", exphbs({ defaultLayout: "main" })); //selects a specific engine of an app
app.set("view engine", "handlebars");



app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
