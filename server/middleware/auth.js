const jwt = require("jsonwebtoken");
const { getUserById } = require("../data/Repositories/UsersRepository");

const auth = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return sendNotAuthenticatedResponse(res);
  }

  try {
    const data = jwt.verify(token, process.env.accessTokenSecret);
    if (Date.now() >= data.exp * 1000) {
      return sendNotAuthenticatedResponse(res);
    }

    const user = await getUserById(data.id);

    if (!user.length) {
      return sendNotAuthenticatedResponse(res);
    }

    res.user = user[0];
  } catch (error) {
    return sendNotAuthenticatedResponse(res);
  }

  next();
};

const sendNotAuthenticatedResponse = (res) => {
  return res.sendResponse({
    success: false,
    error: "Not authorized",
    status: 401,
  });
};

module.exports = auth;
