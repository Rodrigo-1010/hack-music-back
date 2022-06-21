const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  category: String, //category ID
  description: String,
  picture: [],
  price: Number,
  stock: Number,
  outstand: Boolean,
  slug: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
