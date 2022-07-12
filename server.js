require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require("cors");
const dbSetup = require("./db");
dbSetup();

app.use(cors());
app.use(express.json());

routes(app);

// Hola

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server running on port " + process.env.SERVER_PORT);
});

module.exports = app;
