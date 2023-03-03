const express = require("express");
const validateLogin = require("../../middleware/validateLogin");
const authService = require("./AuthService");
const authRouter = express.Router();

authRouter.post("/refresh", async (req, res) => {
  authService.refresh(req, res);
});

authRouter.post("/signin", validateLogin, async (req, res) => {
  authService.signin(req, res);
});

authRouter.post("/signup", (req, res) => {
  return authService.signup(req, res);
});

module.exports = authRouter;
