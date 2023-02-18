const express = require("express");
const morgan = require("morgan");
var bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const commonResponse = require("./middleware/commonResponse");
dotenv.config();
const { fetchUser } = require("./data/database");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(commonResponse);

const userRouter = require("./routes/User/UserController");
const authRouter = require("./routes/auth/AuthController");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

app.get("/ping", async (req, res) => {
  var ids = req.query.ids.split(",");

  for (let i = 0; i < ids.length; i++) {
    await fetchUser(ids[i]);
  }

  return res.status(200).json("pong");
});

module.exports = app;
