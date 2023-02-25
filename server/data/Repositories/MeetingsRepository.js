const getConnection = require("../dbconnection");

const database = getConnection();

const getMeetings = (id) => {
  return new Promise((resolve, reject) => {
    database.query(
      "SELECT * FROM Meetings WHERE owner = ?",
      [id],
      (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      }
    );
  });
};

const getAllMeetings = () => {
  return new Promise((resolve, reject) => {
    database.query("SELECT * FROM Meetings", (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

const createMeeting = (owner, startTime, endTime, participants) => {
  return new Promise((resolve, reject) => {
    database.query(
      "INSERT INTO Meetings(owner, startTime, endTime, participants, hourlyRate)" +
        "VALUES (?,?,?,?, 300)",
      [owner, startTime, endTime, participants],
      (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      }
    );
  });
};

module.exports = {
  getMeetings,
  getAllMeetings,
  createMeeting,
};
