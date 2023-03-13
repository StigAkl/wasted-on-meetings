const getConnection = require("../dbconnection");

const getMeetings = async (id) => {
  const database = await getConnection();
  const query = {
    text: "SELECT * FROM Meetings WHERE owner=$1",
    values: [id],
  };
  const result = await database.query(query);
  return result.rows;
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
  const query = {
    text:
      "INSERT INTO Meetings(owner, startTime, endTime, participants, hourlyRate)" +
      "VALUES ($1,$2,$3,$4,$5)",
    values: [owner, startTime, endTime, participants, 300],
  };

  return await database.query(query);
};

module.exports = {
  getMeetings,
  getAllMeetings,
  createMeeting,
};
