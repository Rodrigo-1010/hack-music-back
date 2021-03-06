const { json } = require("express");
const express = require("express");
const tokensRouter = express.Router();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const User = require("../models/User");

tokensRouter.post("/tokens/admin", async function sendToken(req, res) {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) return res.status(400).json({ msg: "Credenciales no validas." });
    const match = await admin.comparePassword(req.body.password);
    if (!match) return res.status(400).json({ msg: "Credenciales no validas." });
    return res.json({
      firstName: admin.firstName,
      token: jwt.sign({ email: admin.email }, process.env.JWT_SECRET_KEY),
    });
  } catch (err) {
    console.log(err);
  }
});

tokensRouter.post("/tokens", async function sendToken(req, res) {
  if (req.body.email.includes("@admin")) {
    try {
      const user = await Admin.findOne({ email: req.body.email });
      if (!user) return res.status(400).json({ msg: "Credenciales no validas." });
      const match = await user.comparePassword(req.body.password);
      if (!match) return res.status(400).json({ msg: "Credenciales no validas." });
      return res.json({
        firstName: user.firstName,
        token: jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY),
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).json({ msg: "Credenciales no validas." });
      const match = await user.comparePassword(req.body.password);
      if (!match) return res.status(400).json({ msg: "Credenciales no validas." });
      return res.json({
        id: user.id,
        firstName: user.firstName,
        token: jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY),
      });
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = tokensRouter;
