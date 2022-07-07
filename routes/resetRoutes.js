const express = require("express");
const seeder = require("../seeders/seeder");
const resetRouter = express.Router();

resetRouter.get("/reset", async (req, res) => {
  try {
    await seeder();
    res.status(200).json({ msg: "Database succesfully reset." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "We're sorry, the Database couldn't be reset." });
  }
});

module.exports = resetRouter;
