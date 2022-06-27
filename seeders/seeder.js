//Model instantiation
const Product = require("../models/Product");
const Category = require("../models/Category");
const User = require("../models/User");
const Admin = require("../models/Admin");

const { createCategories, assignProductsToCategories } = require("./categorySeeder");
const { createProducts } = require("./productSeeder");
const { createUser } = require("./userSeeder");
const { createAdmin } = require("./adminSeeder");

const seeder = async () => {
  await Category.deleteMany();
  await Product.deleteMany();
  await User.deleteMany();
  await Admin.deleteMany();
  await createUser();
  await createAdmin()
  const categories = await createCategories();
  const products = await createProducts(categories);
  await assignProductsToCategories(categories, products);
};

module.exports = seeder;
