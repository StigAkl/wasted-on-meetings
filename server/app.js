const dotenv = require("dotenv");
dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });
const express = require("express");
const morgan = require("morgan");
const cors = require("./middleware/cors");
const commonResponse = require("./middleware/commonResponse");
var bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//app.use(bodyParser.urlencoded({ extended: true }));
app.enable("trust proxy");
//app.use(morgan("combined"));
app.use(cors);
app.use(commonResponse);

const userRouter = require("./routes/User/UserController");
const authRouter = require("./routes/auth/AuthController");
const meetingRouter = require("./routes/Meeting/MeetingController");

app.get("/hello", (req, res) => {
  res.send("Hello, lmabda");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/meeting", meetingRouter);

module.exports = app;
