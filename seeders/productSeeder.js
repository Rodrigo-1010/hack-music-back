const Product = require("../models/Product");
const seedProducts = require("./products");

const createProducts = async (categories) => {
  const products = seedProducts;
  for (const product of products) {
    for (const category of categories) {
      if (product.categoryName === category.name) {
        product.categoryId = category._id;
      }
    }
  }

  return Product.insertMany(products);
};

module.exports = { createProducts };
