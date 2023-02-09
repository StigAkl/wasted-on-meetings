const sqlite3 = require("sqlite3").verbose();
const DBSOURCE = process.env.DBSOURCE;

const database = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to database");
  }
});

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
    database.get("SELECT email FROM Users WHERE id = ?", [id], (err, row) => {
      if (err) {
        reject(err);
      }
      resolve(row);
    });
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

module.exports = {
  database,
  fetchUser,
  getUserById,
  createUser,
};
