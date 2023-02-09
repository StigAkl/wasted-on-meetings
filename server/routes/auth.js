const express = require("express");
const validateLogin = require("../middleware/validateLogin");
const roles = require("../shared/constants/roles");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const refreshTokenService = require("./../services/refreshTokenService");
const bcrypt = require("bcrypt");
const { fetchUser, createUser } = require("../data/database");

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

authRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body.data;

  const user = await fetchUser(email);

  if (user) {
    return res.sendResponse({
      error: "Det eksisterer allerede en konto med denne e-posten.",
      status: 400,
    });
  }

  try {
    const created = await createUser("test", "test");
    console.log("Created: ", created);
  } catch (err) {
    console.log("Err creating:", err);
  }

  return res.sendResponse({
    data: {
      status: 204,
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
