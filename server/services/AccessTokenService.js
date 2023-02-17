const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const roles = require("../shared/constants/roles");
const verifyToken = (token) => {
  if (!token) return false;

  try {
    jwt.verify(token, process.env.refreshTokenSecret);
    return true;
  } catch (error) {
    return false;
  }
};

const generateAccessToken = (id) => {
  const accessTokenSecret = process.env.accessTokenSecret;
  return signToken(id, process.env.ACCESS_TOKEN_EXPIRES_IN, accessTokenSecret);
};

const generateRefreshToken = (id) => {
  const refreshTokenSecret = process.env.refreshTokenSecret;
  return signToken(
    id,
    process.env.REFRESH_TOKEN_EXPIRES_IN,
    refreshTokenSecret
  );
};

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

module.exports = {
  verifyToken,
  generateAccessToken,
  generateRefreshToken,
  signToken,
};
