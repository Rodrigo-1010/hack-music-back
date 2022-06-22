const Product = require("../models/Product");
const seedProducts = require("./products");

const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(seedProducts);
};

module.exports = seedDB;
