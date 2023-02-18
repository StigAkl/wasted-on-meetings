const express = require("express");
const { getMeetings } = require("../../data/Repositories/MeetingsRepository");
const auth = require("../../middleware/auth");

const meetingRouter = express.Router();

meetingRouter.get("/", auth, async (req, res) => {
  const id = res.user.id;

  const meetings = await getMeetings(id);

  res.status(200).json({
    meetings,
  });
});

module.exports = meetingRouter;
