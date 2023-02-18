const request = require("supertest");
const app = require("../app");
const database = require("../data/Repositories/MeetingsRepository");
jest.mock("../data/Repositories/MeetingsRepository");

let mockGetMeetings = jest.spyOn(database, "getMeetings");

database.getMeetings = mockGetMeetings;

describe("When calling meeting endpoints", () => {
  const meetingsUrl = "/api/v1/meeting";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("That get all meetings returns http 401", async () => {
    const res = await request(app).get(meetingsUrl);

    expect(res.statusCode).toEqual(401);
  });
});
