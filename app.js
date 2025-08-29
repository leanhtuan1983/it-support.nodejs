const express = require("express");
const session = require("express-session");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();

const authRouter = require("./routes/authRouter");
const dashboardRouter = require("./routes/dashboardRouter");
const userRouter = require("./routes/userRouter");
const departmentRouter = require("./routes/departmentRouter");

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Setup layouts
app.use(expressLayouts);
app.set("layout", "layouts/app");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Routes

app.use("/", authRouter);
app.use("/dashboard", dashboardRouter);
app.use("/users", userRouter);
app.use("/departments", departmentRouter);

module.exports = app;
