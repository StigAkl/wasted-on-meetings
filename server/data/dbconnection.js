const { Pool } = require("pg");

const connection = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

let database;

const getConnection = async () => {
  if (!database) {
    database = new Pool(connection);
  }
  return database;
};

module.exports = getConnection;
