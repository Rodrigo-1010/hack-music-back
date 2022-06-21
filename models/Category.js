const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: String,
  description: String,
  picture: String,
  slug: String,
  products: [],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
