const express = require("express");
const validateLogin = require("../middleware/validateLogin");
const roles = require("../shared/constants/roles");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const refreshTokenService = require("./../services/refreshTokenService");
const bcrypt = require("bcrypt");

authRouter.post("/signin", validateLogin, async (req, res) => {
  const refreshTokenSecret = process.env.refreshTokenSecret;
  const accessTokenSecret = process.env.accessTokenSecret;

  const id = res.user.id;

  const accessToken = signToken(
    id,
    process.env.ACCESS_TOKEN_EXPIRES_IN,
    accessTokenSecret
  );
  const refreshToken = signToken(
    id,
    process.env.REFRESH_TOKEN_EXPIRES_IN,
    refreshTokenSecret
  );

  refreshTokenService.addRefreshToken(refreshToken, id);

  res.sendResponse({
    data: {
      refreshToken: refreshToken,
      accessToken: accessToken,
    },
  });
});

const signToken = (id, expiresIn, secret) => {
  return jwt.sign(
    {
      role: roles.user,
      id,
    },
    secret,
    { expiresIn: expiresIn }
  );
};

authRouter.get("/bcrypted", async (req, res) => {
  const pw = req.query.password;
  const hash = await bcrypt.hash(pw, 10);

  res.status(200).json({
    hash,
  });
});

module.exports = authRouter;
