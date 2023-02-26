const mysql = require("mysql");

const connection = {
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

let database;

const getConnection = async () => {
  if (!database) {
    database = new mysql.createConnection(connection);
    await database.connect(function (err) {
      if (err) {
        console.log("Error connecting to database:", err);
        throw err;
      }
    });
  }
  return database;
};

module.exports = getConnection;
