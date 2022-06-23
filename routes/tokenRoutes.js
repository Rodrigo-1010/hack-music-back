const express = require("express");
const tokensRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

tokensRouter.post("/tokens", async function sendToken(req, res) {
  try {
    const user = await User.findById(?);
  } catch (err) {}

  const token = jwt.sign(user, process.env.JWT_SECRET_KEY);
});

module.exports = tokensRouter;
