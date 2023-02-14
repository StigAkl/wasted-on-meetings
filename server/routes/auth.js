const express = require("express");
const validateLogin = require("../middleware/validateLogin");
const roles = require("../shared/constants/roles");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const refreshTokenService = require("./../services/refreshTokenService");
const bcrypt = require("bcrypt");
const { fetchUser, createUser } = require("../data/database");
const {
  emailValidator,
  passwordValidator,
} = require("../shared/utils/validator");

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

  if (!emailValidator(email)) {
    return res.sendResponse({
      status: 400,
      error: "Email error",
    });
  }

  if (!passwordValidator(password)) {
    return res.sendResponse({
      status: 400,
      error: "Password error",
    });
  }

  const user = await fetchUser(email);

  if (user) {
    return res.sendResponse({
      error: "Det eksisterer allerede en konto med denne e-posten.",
      status: 400,
    });
  }
  const hash = bcrypt.hash(password, 10);

  try {
    await createUser(email, hash);
  } catch (err) {
    console.error("Error creating user:", err);
    return res.sendResponse({
      error: "Error creating user.",
      status: 500,
    });
  }

  return res.sendResponse({
    status: 204,
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
