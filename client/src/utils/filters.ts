import { Meeting } from "../types";

export const activeMeetingsFilter = (m: Meeting) => {
  return m.startTime <= new Date() && m.endTime >= new Date();
};

export const previousMeetingsFilter = (m: Meeting) => {
  return m.startTime <= new Date() && m.endTime <= new Date();
};

export const calculateMeetingdurationInHours = (meeting: Meeting) => {
  const meetingDuration =
    (meeting.endTime.getTime() - meeting.startTime.getTime()) /
    (1000 * 60 * 60);
  return meetingDuration;
};
