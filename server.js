require("dotenv").config();
const express = require("express");
const app = express();
const dbSetup = require("./db");
dbSetup();

app.get("/", (req, res) => {
  res.send("Working!");
});

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server running on port " + process.env.SERVER_PORT);
});
