const { json } = require("express");
const express = require("express");
const tokensRouter = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

tokensRouter.post("/tokens", async function sendToken(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);

    if (!user) return res.json({ msg: "Credenciales no validas." });

    const match = await user.comparePassword(req.body.password);
    if (!match) return res.json({ msg: "Credenciales no validas." });
    return res.json({ token: jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY) });
  } catch (err) {
    console.log(err);
  }
});

module.exports = tokensRouter;
