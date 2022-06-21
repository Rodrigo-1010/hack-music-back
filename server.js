require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");
const dbSetup = require("./db");
dbSetup();

routes(app);

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server running on port " + process.env.SERVER_PORT);
});
