const sendErrorResponse = async (res, errorMessage, status = 500) => {
  return await res.sendResponse({
    status: status,
    error: errorMessage,
    success: false,
  });
};

module.exports = {
  sendErrorResponse,
};
