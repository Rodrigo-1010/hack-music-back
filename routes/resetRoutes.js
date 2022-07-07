const express = require("express");
const seeder = require("../seeders/seeder");
const resetRouter = express.Router();

resetRouter.get("/reset", async (req, res) => {
  await seeder();
  res.status(200).json({ msg: "Database succesfully reset." });
});

module.exports = resetRouter;
