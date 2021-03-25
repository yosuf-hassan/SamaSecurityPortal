// includes

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

// Passport Config

require('./config/passport')(passport);

// Route definitions

const indexrouter = require("./routes/index");
const shoprouter = require("./routes/shops");
const homerouter = require("./routes/users");

// Database connection Mongoose

mongoose.connect("mongodb+srv://usr:hanna@samadb.jrb2a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Listen on events on Database class -- commented cause not supported in next major version
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

// Definition of paths

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

// Express session

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware

app.use(passport.initialize());
app.use(passport.session());

// Connect flash

app.use(flash());

// Global variables

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


//Route declerations

app.use("/", indexrouter);
app.use("/shops", shoprouter);
app.use("/users", homerouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server Started on port ${PORT}`));
