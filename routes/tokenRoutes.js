const express = require("express");
const tokensRouter = express.Router();

tokensRouter.post("/", async function sendToken(req, res) {
  res.json();
});
