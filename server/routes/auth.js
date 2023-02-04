const express = require("express");
const validateLogin = require("../middleware/validateLogin");
const roles = require("../shared/constants/roles");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();

authRouter.post("/signin", validateLogin, async (req, res) => {
  const refreshTokenSecret = process.env.refreshTokenSecret;
  const accessTokenSecret = process.env.accessTokenSecret;

  const refreshToken = jwt.sign(
    {
      role: roles.user,
      id: res.user.id,
    },
    refreshTokenSecret,
    { expiresIn: "7d" }
  );

  const accessToken = jwt.sign(
    {
      role: roles.user,
      id: res.user.id,
    },
    accessTokenSecret,
    { expiresIn: "1h" }
  );

  res.sendResponse({
    data: {
      refreshToken: refreshToken,
      accessToken: accessToken,
    },
  });
});

module.exports = authRouter;
