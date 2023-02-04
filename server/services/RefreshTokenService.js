let refreshTokens = [];

const addRefreshToken = (token, userId) => {
  refreshTokens.push({
    token,
    userId,
  });
};

const removeRefreshTokenByToken = (token) => {
  refreshTokens = refreshTokens.filter((t) => t.token !== token);
};

const removeRefreshTokenById = (userId) => {
  refreshTokens = refreshTokens.filter((t) => t.userId !== userId);
};

const getRefreshTokens = () => {
  return refreshTokens;
};

module.exports = {
  addRefreshToken,
  removeRefreshTokenByToken,
  removeRefreshTokenById,
  getRefreshTokens,
};
