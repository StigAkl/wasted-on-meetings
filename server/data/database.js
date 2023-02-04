const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = process.env.DBSOURCE;

const database = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected!");
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

module.exports = {
  database,
  fetchUser,
};
