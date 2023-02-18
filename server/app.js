const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const commonResponse = require("./middleware/commonResponse");
const { fetchUser } = require("./data/Repositories/UsersRepository");
var bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.enable("trust proxy");
app.use(morgan("combined"));
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
