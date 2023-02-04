const express = require("express");
const validateLogin = require("../middleware/validateLogin");
const roles = require("../shared/constants/roles");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const refreshTokenService = require("./../services/refreshTokenService");

authRouter.post("/signin", validateLogin, async (req, res) => {
  const refreshTokenSecret = process.env.refreshTokenSecret;
  const accessTokenSecret = process.env.accessTokenSecret;

  const refreshToken = jwt.sign(
    {
      role: roles.user,
      id: res.user.id,
    },
    refreshTokenSecret,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
  );

  const accessToken = jwt.sign(
    {
      role: roles.user,
      id: res.user.id,
    },
    accessTokenSecret,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
  );

  refreshTokenService.addRefreshToken(refreshToken, res.user.id);

  res.sendResponse({
    data: {
      refreshToken: refreshToken,
      accessToken: accessToken,
    },
  });
});

module.exports = authRouter;
