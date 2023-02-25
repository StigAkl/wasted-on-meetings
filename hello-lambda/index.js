const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const serverless = require("serverless-http");
const app = express();

app.get("/hello", (req, res) => {
  res.status(200).send("Hello, daawdd");
});

module.exports.handler = serverless(app);
