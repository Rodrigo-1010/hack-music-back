const mongoose = require("mongoose");
const Product = require("./models/Product");

module.exports = async function dbSetup() {
  mongoose.connect("mongodb://localhost:27017/hack-music");
  mongoose.connection
    .once("open", () => console.log("¡Conexión con la base de datos establecida!"))
    .on("error", (error) => console.log(error));
};

const seedProducts = [
  {
    name: "Bata",
    category: "Percusion",
    description: "Buena bata bo!",
    picture: [],
    price: 2500,
    stock: 5,
    outstand: true,
    slug: "buena-bata-bo",
  },
  {
    name: "Trompeta",
    category: "Viento",
    description: "Buena trompetinhaa bo!",
    picture: [],
    price: 1000,
    stock: 15,
    outstand: false,
    slug: "buena-trompetinha-bo",
  },
  {
    name: "Tremendo bajo",
    category: "Cuerdas",
    description: "Tremebundo bajo!",
    picture: [],
    price: 5500,
    stock: 10,
    outstand: true,
    slug: "alto-bajo",
  },
];

const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(seedProducts);
};

seedDB();
