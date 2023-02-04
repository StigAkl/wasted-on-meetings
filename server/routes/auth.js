const express = require("express");
const validateLogin = require("../middleware/validateLogin");
const roles = require("../shared/constants/roles");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const refreshTokenService = require("./../services/refreshTokenService");

authRouter.post("/signin", validateLogin, async (req, res) => {
  const refreshTokenSecret = process.env.refreshTokenSecret;
  const accessTokenSecret = process.env.accessTokenSecret;

  const accessToken = signToken(
    res,
    process.env.ACCESS_TOKEN_EXPIRES_IN,
    accessTokenSecret
  );
  const refreshToken = signToken(
    res,
    process.env.REFRESH_TOKEN_EXPIRES_IN,
    refreshTokenSecret
  );

  refreshTokenService.addRefreshToken(refreshToken, res.user.id);

  res.sendResponse({
    data: {
      refreshToken: refreshToken,
      accessToken: accessToken,
    },
  });
});

const signToken = (res, expiresIn, secret) => {
  return jwt.sign(
    {
      role: roles.user,
      id: res.user.id,
    },
    secret,
    { expiresIn: expiresIn }
  );
};

module.exports = authRouter;
