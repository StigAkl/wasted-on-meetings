const request = require("supertest");
const app = require("../app");
const meetingsRepository = require("../data/Repositories/MeetingsRepository");

describe("When calling GET /api/v1/meeting", () => {
  meetingsRepository.getUserById = jest.fn().mockImplementation(() => {
    return { email: 'test@test.no"' };
  });

  const meetingsUrl = "/api/v1/meeting";

  require("./authMock")();

  test("That get all meetings returns http 401", async () => {
    const res = await request(app)
      .get(meetingsUrl)
      .set("x-access-token", "token");

    expect(res.statusCode).toEqual(200);
  });

  test("That should get 401 when no token", async () => {
    const res = await request(app).get(meetingsUrl);

    expect(res.statusCode).toEqual(401);
  });
});
