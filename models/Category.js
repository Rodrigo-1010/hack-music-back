const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: String,
  alias: String,
  img: String,
  slug: String,
  products: [{ type: Schema.Types.ObjectId, ref: "product" }],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
