const express = require("express");
const { fetchUser } = require("./../data/database");

const userRouter = express.Router();

userRouter.get("/:email", async (req, res) => {
  const email = req.params.email;
  if (!email) {
    res.status(400).json({
      error: "Missing parameter :email",
    });
  }

  try {
    const user = await fetchUser(email);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = userRouter;
