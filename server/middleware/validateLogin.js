const { fetchUser } = require("../data/database");
const error = require("../shared/errors/errors");
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
    res.user = user;
    return next();
  }

  return invalidCredentialsResponse(res);
};

const invalidCredentialsResponse = (res) => {
  return res.sendResponse({
    status: 400,
    success: false,
    error: error.invalidCredentials,
  });
};

module.exports = validateLogin;
