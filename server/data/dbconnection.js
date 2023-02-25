const mysql = require("mysql");

const connection = {
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

let database;

const getConnection = () => {
  if (!database) {
    database = new mysql.createConnection(connection);
    database.connect(function (err) {
      if (err) throw err;
    });
  }
  return database;
};

module.exports = getConnection;
