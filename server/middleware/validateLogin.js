const { fetchUser } = require("../data/Repositories/UsersRepository");
const { AUTH_ERROR } = require("../shared/constants/errors");
const bcrypt = require("bcrypt");

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return invalidCredentialsResponse(res);
  }

  const user = await fetchUser(email);

  if (!user) {
    return invalidCredentialsResponse(res);
  }

  const compare = await bcrypt.compare(password, user.password);

  if (compare) {
    req.user = user;
    return next();
  }

  return invalidCredentialsResponse(res);
};

const invalidCredentialsResponse = (res) => {
  return res.sendResponse({
    status: 401,
    success: false,
    error: AUTH_ERROR.invalidCredentials,
  });
};

module.exports = validateLogin;
