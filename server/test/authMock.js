const jwt = require("jsonwebtoken");
const usersRepository = require("../data/Repositories/UsersRepository");

const authMock = () => {
  const expiration = new Date();
  expiration.setHours(new Date().getHours() + 2);

  jwt.verify = jest.fn().mockImplementation(() => {
    return { id: 1, exp: expiration };
  });
  jest.mock("../data/Repositories/MeetingsRepository");
  jest.mock("../data/Repositories/UsersRepository");
  let mockGetUserById = jest.spyOn(usersRepository, "getUserById");

  mockGetUserById.mockImplementation(() => {
    return { email: "test@test.test" };
  });

  usersRepository.getUserById = mockGetUserById;
};

module.exports = authMock;
