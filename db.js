const mongoose = require("mongoose");
const seedDB = require("./seeders/productSeeder");

module.exports = async function dbSetup() {
  mongoose.connect("mongodb://localhost:27017/hack-music");
  mongoose.connection
    .once("open", () => console.log("¡Conexión con la base de datos establecida!"))
    .on("error", (error) => console.log(error));
  seedDB();
};
