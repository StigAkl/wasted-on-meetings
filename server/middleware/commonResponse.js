const headers = require("../shared/headers");

const defaultResponse = (req, res, next) => {
  res.sendResponse = ({
    data = null,
    error = null,
    status = 200,
    success = true,
  }) => {
    res.set(headers);
    if (error) {
      res.status(status).send({
        success: false,
        error,
      });
    } else {
      res.status(status).send({
        success,
        data,
      });
    }
  };
  next();
};

module.exports = defaultResponse;
