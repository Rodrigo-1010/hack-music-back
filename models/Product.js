const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
  categoryName: String,
  description: String,
  picture: [String],
  price: Number,
  stock: Number,
  premium: Boolean,
  slug: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
