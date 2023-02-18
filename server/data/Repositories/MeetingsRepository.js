const getConnection = require("../dbconnection");

const database = getConnection();

const getMeetings = (id) => {
  return new Promise((resolve, reject) => {
    database.all("SELECT * FROM Meetings WHERE owner = ?", [id], (err, row) => {
      if (err) {
        reject(err);
      }
      resolve(row);
    });
  });
};

const getAllMeetings = () => {
  return new Promise((resolve, reject) => {
    database.get("SELECT * FROM Meetings", (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

module.exports = {
  getMeetings,
  getAllMeetings,
};
