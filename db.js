const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = "mongodb://127.0.0.1:27017/tested";
// const mongoURL=process.env.compass_url;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to the mongodb server");
});

db.on("error", (err) => {
  console.log("Mongodb connection error:", err);
});

db.on("disconnected", () => {
  console.log("Mongodb disconnected");
});

module.exports = db;
