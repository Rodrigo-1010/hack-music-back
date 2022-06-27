const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

// Display a listing of orders.
async function index(req, res) {}

// Display the specified order.
async function show(req, res) {}

// Store a newly created order in storage.
async function store(req, res) {
  console.log(req.body);
  const productsIds = req.body.cartItems.map((cartItem) => cartItem.productId);
  try {
    const products = await Product.find(
      {
        _id: { $in: productsIds },
      },
      "name price",
    );
    // Chequear esta info como llega. Array de objetos?
    const buyer = await User.find({ email: req.auth.email });
    if (!buyer) return res.status(400).json({ msg: "User not found" });

    const totalPrice = products.reduce((accum, product) => {
      return accum + product.quantity * product.price;
    });

    const order = await Order.create({
      buyer: req.body.user, // O buyer
      products: products,
      totalPrice: totalPrice,
      status: "not paid", // Estos hay que definir bien el string para cada uno...
      paymentMethod: "", // Same que status
      address: "",
    });

    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}

// Capaz hay que agregar el patch para cambiar SOLO el status...

module.exports = {
  index,
  show,
  store,
};
