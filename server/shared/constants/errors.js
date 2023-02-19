const AUTH_ERROR = {
  emailError: "Email error",
  passwordError: "Password error",
  emailExists: "Det eksisterer allerede en konto med denne e-posten.",
  creatingUserError: "Error creating user",
  invalidCredentials: "Invalid username / password",
};

const MEETING_ERROR = {
  createMeetingBadRequest:
    "Missing parameter. StartTime, EndTime and Participants must be included",
  createMeetingInternalError: "Error when creating meeting",
};

module.exports = {
  AUTH_ERROR,
  MEETING_ERROR,
};
