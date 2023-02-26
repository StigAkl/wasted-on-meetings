const { MEETING_ERROR } = require("../../shared/constants/errors");
const {
  createMeeting,
} = require("./../../data/Repositories/MeetingsRepository");

const createMeetings = async (owner, startTime, endTime, participants, res) => {
  try {
    await createMeeting(
      owner,
      startTime.slice(0, -1),
      endTime.slice(0, -1),
      participants
    );
  } catch (err) {
    res.status(500).json({
      error: MEETING_ERROR.createMeetingInternalError,
    });
  }
  return res.status(204).send();
};

module.exports = { createMeetings };
