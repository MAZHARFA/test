const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");
require("dotenv").config();
const passport = require("./Auth");

app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
// this port is used to process on others only work local 5000 port
// const PORT=process.env.PORT ||5000;

// Middlewear Function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`
  );
  next(); // Move to the next phase
};

app.use(logRequest);

app.use(passport.initialize());

// const localAuthMiddleware = passport.authenticate("local", { session: false });//Activevate on any routes use login

app.get("/", (req, res) => {
  res.send("Welcome");
});








// import the router


const personRoutes = require("./Routes/personRoutes");

// use  the  router
app.use("/login", personRoutes);

// console.log('hello');//check the server is working or not

app.listen(5000, () => {
  console.log(`listening on port: 5000`);
});


