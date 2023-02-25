const { fetchUser } = require("../data/Repositories/UsersRepository");
const { AUTH_ERROR } = require("../shared/constants/errors");
const bcrypt = require("bcryptjs");

const validateLogin = async (req, res, next) => {
  console.log("VALIDATING LOGIN!");
  const { email, password } = req.body;

  if (!email || !password) {
    return invalidCredentialsResponse(res);
  }

  console.log("FETCHING USER BY EMAIL FROM VALIDATE LOGIN:", email);
  const user = await fetchUser(email);
  console.log("USER FETCHED:", user);

  if (!user.length) {
    return invalidCredentialsResponse(res);
  }

  const compare = await bcrypt.compare(password, user[0].password);

  if (compare) {
    req.user = user[0];
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
