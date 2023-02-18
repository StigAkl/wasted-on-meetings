const sqlite3 = require("sqlite3").verbose();
const DBSOURCE = process.env.DBSOURCE;

let database;

const getConnection = () => {
  if (!database) {
    database = new sqlite3.Database(DBSOURCE);
  }

  return database;
};

module.exports = getConnection;
