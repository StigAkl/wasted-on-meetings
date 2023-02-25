const app = require("./app");
const port = process.env.PORT || 5000;
const serverless = require("serverless-http");

if (process.env.NODE_ENV === "development") {
  app.listen(port, () => console.log("Server listening on port " + port));
} else {
  console.log("SERVERLESS");
  module.exports.handler = serverless(app);
}
