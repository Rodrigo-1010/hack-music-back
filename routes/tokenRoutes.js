const express = require("express");
const tokensRouter = express.Router();

tokensRouter.post("/tokens", async function sendToken(req, res) {});

module.exports = tokensRouter;
