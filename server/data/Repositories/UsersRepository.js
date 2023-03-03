const getConnection = require("../dbconnection");

const fetchUser = async (email) => {
  const database = await getConnection();
  return new Promise((resolve, reject) => {
    database.query("SELECT * FROM Users where email=?", [email], (err, row) => {
      if (err) {
        reject(err);
      }
      resolve(row);
    });
  });
};

const getUserById = async (id) => {
  const database = await getConnection();
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

const createUser = async (email, password) => {
  const database = await getConnection();
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
