const getConnection = require("../dbconnection");

const database = getConnection();

const fetchUser = (email) => {
  return new Promise((resolve, reject) => {
    database.query("SELECT * FROM Users where email=?", [email], (err, row) => {
      if (err) {
        reject(err);
      }
      resolve(row);
    });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    database.query(
      "SELECT id,email FROM Users WHERE id = ?",
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

const createUser = (email, password) => {
  return new Promise((resolve, reject) => {
    database.query(
      "INSERT INTO Users(email, password) VALUES(?,?)",
      [email, password],
      (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      }
    );
  });
};

process.on("SIGINT", () => {
  database.close();
});

module.exports = {
  fetchUser,
  getUserById,
  createUser,
};
