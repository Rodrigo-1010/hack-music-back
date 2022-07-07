//Model instantiation
const Product = require("../models/Product");
const Category = require("../models/Category");
const User = require("../models/User");
const Admin = require("../models/Admin");
const Address = require("../models/Address");
const Order = require("../models/Order");

const { createCategories, assignProductsToCategories } = require("./categorySeeder");
const { createProducts } = require("./productSeeder");
const { createUser, assignAddressToUser } = require("./userSeeder");
const { createAdmin } = require("./adminSeeder");
const { assignUserToAddress } = require("./addressSeeder");

const seeder = async () => {
  await require("mongoose").connection.dropDatabase();
  // await Category.deleteMany();
  // await Product.deleteMany();
  // await User.deleteMany();
  // await Admin.deleteMany();
  // await Address.deleteMany();
  // await Order.deleteMany();
  await createAdmin();
  const user = await createUser();
  const userAddress = await assignUserToAddress(user._id);
  await assignAddressToUser(user, userAddress);
  const categories = await createCategories();
  const products = await createProducts(categories);
  await assignProductsToCategories(categories, products);
};

module.exports = seeder;
