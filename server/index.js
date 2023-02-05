const express = require("express");
const morgan = require("morgan");
var bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const commonResponse = require("./middleware/commonResponse");
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(commonResponse);

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
