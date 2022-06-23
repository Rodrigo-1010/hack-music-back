const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  buyer: String, // ID que referencia al usuario que realizo la compra
  products: [{ type: Schema.Types.ObjectId, ref: "product" }], //array de objetos con: id, product, quantity, checkoutPrice
  status: String,
  totalPrice: Number,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
