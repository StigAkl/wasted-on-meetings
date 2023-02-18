const express = require("express");

const meetingRouter = express.Router();

meetingRouter.get("/:userId", async (req, res) => {
  const id = req.params.userId;
  res.status(200).json("id:" + id);
});

module.exports = meetingRouter;
