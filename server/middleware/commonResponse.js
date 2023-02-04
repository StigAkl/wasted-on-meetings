const defaultResponse = (req, res, next) => {
  res.sendResponse = ({
    data = null,
    error = null,
    status = 200,
    success = true,
  }) => {
    if (error) {
      res.status(status).send({
        success,
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