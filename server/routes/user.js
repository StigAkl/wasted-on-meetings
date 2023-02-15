const express = require("express");
const { fetchUser, getUserById } = require("../data/database");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.get("/:email", async (req, res) => {
  const email = req.params.email;
  if (!email) {
    res.status(400).json({
      error: "Missing parameter :email",
    });
  }

  try {
    const user = await fetchUser(email);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

userRouter.get("/", async (req, res) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.sendResponse({
      success: false,
      error: "Not authenticated",
      status: 401,
    });
  }

  try {
    const data = jwt.verify(token, process.env.accessTokenSecret);

    if (Date.now() >= data.exp * 1000) {
      res.sendResponse({
        success: false,
        error: "Not authorized",
        status: 401,
      });
    }

    const user = await getUserById(data.id);

    return res.sendResponse({
      data: user,
    });
  } catch (error) {
    return res.sendResponse({
      success: false,
      error: "Not authorized",
      status: 401,
    });
  }
});

module.exports = userRouter;
