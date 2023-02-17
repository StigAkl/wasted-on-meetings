const sendErrorResponse = (res, errorMessage, status = 500) => {
  return res.sendResponse({
    status: status,
    error: errorMessage,
    success: false,
  });
};

module.exports = {
  sendErrorResponse,
};
