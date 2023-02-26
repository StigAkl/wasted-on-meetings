const getConnection = require("../dbconnection");

const getMeetings = async (id) => {
  const database = await getConnection();
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

const getAllMeetings = async () => {
  const database = await getConnection();
  return new Promise((resolve, reject) => {
    database.query("SELECT * FROM Meetings", (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

const createMeeting = async (owner, startTime, endTime, participants) => {
  const database = await getConnection();
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
