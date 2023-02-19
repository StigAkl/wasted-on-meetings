const getConnection = require("../dbconnection");

const database = getConnection();

const fetchUser = (email) => {
  return new Promise((resolve, reject) => {
    database.get("SELECT * FROM Users WHERE email = ?", [email], (err, row) => {
      if (err) {
        reject(err);
      }
      resolve(row);
    });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    database.get(
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
    database.run(
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
  console.log("CLOSE!!!!");
  database.close();
});

module.exports = {
  database,
  fetchUser,
  getUserById,
  createUser,
};