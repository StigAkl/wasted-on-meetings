const DBSOURCE = process.env.DBSOURCE;

let database;

const getConnection = () => {
  const sqlite3 = require("sqlite3").verbose();
  if (!database) {
    database = new sqlite3.Database(DBSOURCE);
  }

  return database;
};

module.exports = getConnection;
