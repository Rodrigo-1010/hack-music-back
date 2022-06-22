const Product = require("../models/Product");

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
