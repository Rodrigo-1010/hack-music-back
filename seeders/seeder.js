const Product = require("../models/Product");
const Category = require("../models/Category");
const { createCategories, assignProductsToCategories } = require("./categorySeeder");
const { createProducts } = require("./productSeeder");

const seeder = async () => {
  await Category.deleteMany();
  await Product.deleteMany();
  const categories = await createCategories();
  const products = await createProducts(categories);
  await assignProductsToCategories(categories, products);
};

module.exports = seeder;
