const headers = require("../shared/headers");

const cors = async (req, res, next) => {
  res.set(headers);

  next();
};

module.exports = cors;
