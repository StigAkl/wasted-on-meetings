const request = require("supertest");
const app = require("../app");
const { AUTH_ERROR } = require("../shared/constants/errors");
const database = require("../data/database");
const bcrypt = require("bcrypt");

jest.mock("../data/database");

let mockCreateUser = jest.spyOn(database, "createUser");
let mockFetchUser = jest.spyOn(database, "fetchUser");
let mockGetUserById = jest.spyOn(database, "getUserById");
database.createUser = mockCreateUser;
database.fetchUser = mockFetchUser;
database.getUserById = mockGetUserById;

const signupUrl = "/api/v1/auth/signup";
const pingUrl = "/ping?ids=kake1,kake2,kake3";
const signinUrl = "/api/v1/auth/signin";

describe("When calling Auth endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("test that API is alive", async () => {
    const res = await request(app).get(pingUrl);
    expect(res.statusCode).toEqual(200);
    expect(mockFetchUser).toHaveBeenCalledTimes(3);
    expect(res.body).toEqual("pong");
  });

  test("returns 400 and password error when invalid password on signup", async () => {
    const res = await request(app).post(signupUrl).send({
      email: "test@test.no",
      password: "test",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual(AUTH_ERROR.passwordError);
    expect(mockCreateUser).toHaveBeenCalledTimes(0);
  });

  test("returns 400 and email error when missing @ in email", async () => {
    const res = await request(app).post(signupUrl).send({
      email: "testtest.no",
      password: "Test1234!",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual(AUTH_ERROR.emailError);
    expect(mockCreateUser).toHaveBeenCalledTimes(0);
  });

  test("returns 204 when valid password and email", async () => {
    const res = await request(app).post(signupUrl).send({
      email: "test@test.no",
      password: "Test1234!",
    });

    expect(res.statusCode).toEqual(204);
    expect(mockCreateUser).toHaveBeenCalledTimes(1);
  });

  test("that signin returns 401 when invalid credentials", async () => {
    const res = await request(app).post(signinUrl).send({
      email: "test@test.no",
      password: "test321!",
    });
    expect(res.statusCode).toEqual(401);
    expect(database.fetchUser).toHaveBeenCalledTimes(1);
  });

  test("returns token when valid username and password", async () => {
    const mockedUserResponse = {
      email: "test@test.com",
      id: 1,
      password: await bcrypt.hash("test", 1),
    };

    mockFetchUser.mockImplementation(() => mockedUserResponse);

    const res = await request(app).post(signinUrl).send({
      email: "test@test.com",
      password: "test",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.accessToken).not.toBeNull();
  });
});
