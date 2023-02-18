const defaultResponse = (req, res, next) => {
  console.log(req.socket.remoteAddress);
  res.sendResponse = ({
    data = null,
    error = null,
    status = 200,
    success = true,
  }) => {
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
