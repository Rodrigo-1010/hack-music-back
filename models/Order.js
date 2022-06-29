const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    buyer: { type: Schema.Types.ObjectId, ref: "User" }, // ID que referencia al usuario que realizo la compra
    products: Array, //array de objetos con: id, product, quantity, checkoutPrice
    status: String,
    totalPrice: Number, // No asociar a los prices de products
    paymentMethod: String, // String?
    address: String, // No asociar a una adress de la BD
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
