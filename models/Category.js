const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: String,
  alias: String,
  img: String,
  headerImg: String,
  slug: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
