const refreshTokenService = require("../../services/RefreshTokenService");
const {
  verifyToken,
  generateAccessToken,
  generateRefreshToken,
} = require("../../services/AccessTokenService");
const { sendErrorResponse } = require("../../shared/utils/common");
const {
  emailValidator,
  passwordValidator,
} = require("../../shared/utils/validator");
const { AUTH_ERROR } = require("../../shared/constants/errors");
const {
  fetchUser,
  createUser,
} = require("../../data/Repositories/UsersRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const headers = require("../../shared/headers");

module.exports.signin = (req, res) => {
  res.set(headers);
  const id = req.user.id;
  const accessToken = generateAccessToken(id);
  const refreshToken = generateRefreshToken(id);

  refreshTokenService.addRefreshToken(refreshToken, id);

  return res.sendResponse({
    data: {
      refreshToken: refreshToken,
      accessToken: accessToken,
    },
  });
};

module.exports.signup = async (req, res) => {
  res.set(headers);
  const { email, password } = req.body;

  if (!emailValidator(email)) {
    return await sendErrorResponse(res, AUTH_ERROR.emailError, 400);
  }

  if (!passwordValidator(password)) {
    return await sendErrorResponse(res, AUTH_ERROR.passwordError, 400);
  }

  const user = await fetchUser(email);

  if (user) {
    return await sendErrorResponse(res, AUTH_ERROR.emailExists, 400);
  }

  const hash = await bcrypt.hash(password, 10);

  try {
    await createUser(email, hash);
  } catch (err) {
    console.error(AUTH_ERROR.creatingUserError, err);
    return await sendErrorResponse(res, AUTH_ERROR.creatingUserError, 500);
  }

  return await res.sendResponse({
    status: 204,
  });
};

module.exports.refresh = async (req, res) => {
  res.set(headers);
  const token = req.headers["x-refresh-token"];
  if (verifyToken(token)) {
    const id = jwt.decode(token).id;
    const accessToken = generateAccessToken(id);
    const refreshToken = generateRefreshToken(id);
    return res.sendResponse({
      data: {
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    });
  }

  return res.sendResponse({
    status: 403,
  });
};
