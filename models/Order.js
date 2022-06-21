const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  buyer: String, // ID que referencia al usuario que realizo la compra
  products: [{}], //array de objetos con: id, product, quantity, checkoutPrice
  status: Stringn,
  totalPrice: Number,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
