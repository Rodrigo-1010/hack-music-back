const mongoose = require("mongoose");
const seedDB = require("./seeders/productSeeder");
const seeder = require("./seeders/seeder");
const categorySeeder = require("./seeders/categorySeeder");

module.exports = async function dbSetup() {
  mongoose.connect("mongodb://localhost:27017/hack-music");
  mongoose.connection
    .once("open", () => console.log("¡Conexión con la base de datos establecida!"))
    .on("error", (error) => console.log(error));

  //Comentar/descomentar seedDb() para que seeders se ejecuten automaticamente cada vez que se levanta el servidor.

  seeder();
  // seedDB();
  // categorySeeder();
};
