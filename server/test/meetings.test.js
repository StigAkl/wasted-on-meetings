const request = require("supertest");
const app = require("../app");
const database = require("../data/Repositories/MeetingsRepository");
const meetingsUrl = "/api/v1/meetings/1";
jest.mock("../data/Repositories/MeetingsRepository");

let mockGetMeetings = jest.spyOn(database, "getMeetings");

describe("When calling meeting endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("That get all meetings returns http 200", async () => {
    const res = await request(app).get(meetingsUrl);

    expect(res.statusCode).toEqual(200);
  });
});
