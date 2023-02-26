const express = require("express");
const { getMeetings } = require("../../data/Repositories/MeetingsRepository");
const auth = require("../../middleware/auth");
const { createMeetings } = require("./MeetingsService");
const { MEETING_ERROR } = require("../../shared/constants/errors");
const meetingRouter = express.Router();

meetingRouter.get("/", auth, async (req, res) => {
  const id = res.user.id;

  const meetings = await getMeetings(id);

  res.status(200).json({
    meetings,
  });
});

meetingRouter.post("/create", auth, async (req, res) => {
  const { startTime, endTime, participants } = req.body;

  if (!startTime || !endTime || !participants) {
    return res.status(400).send({
      error: MEETING_ERROR.createMeetingBadRequest,
    });
  }

  const owner = res.user.id;
  await createMeetings(owner, startTime, endTime, participants, res);
});

module.exports = meetingRouter;
