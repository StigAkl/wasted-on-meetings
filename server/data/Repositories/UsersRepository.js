const getConnection = require("../dbconnection");

const fetchUser = async (email) => {
  const query = {
    text: "SELECT * FROM users WHERE email=$1",
    values: [email],
  };
  const database = await getConnection();
  const result = await database.query(query);
  return result.rows[0];
};

const getUserById = async (id) => {
  const database = await getConnection();
  const query = {
    text: "SELECT id, email FROM users WHERE id = $1",
    values: [id],
  };

  const user = await database.query(query);
  return user;
};

const createUser = async (email, password) => {
  const database = await getConnection();
  const query = {
    text: "INSERT INTO users(email, password) VALUES($1, $2)",
    values: [email, password],
  };
  await database.query(query);
};

process.on("SIGINT", () => {
  database.close();
});

module.exports = {
  fetchUser,
  getUserById,
  createUser,
};
