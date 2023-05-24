var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

//Connect to MongoDB with mongoose
const mongoose = require("mongoose");

// this is the connection to the database
mongoose
  .connect(process.env.MONGODB_URI, { dbName: "little-lemon-db" })
  .then(() => console.log("Connected to little-lemon-server on MongoDB"))
  .catch((err) => console.log(err));

//routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users/users");
var cartRouter = require("./routes/cart/cart"); // this is the route for the cart

var cors = require("cors");
// connection is an instance of MongoClient. require("mongodb") returns the same object as require("mongodb").MongoClient
const { connected } = require("process");
var app = express();

// app.use(cors());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/cart", cartRouter)  // this is the route for the cart

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
