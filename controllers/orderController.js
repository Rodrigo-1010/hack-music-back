const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

// Display a listing of orders.
async function index(req, res) {}

// Display the specified order.
async function show(req, res) {}

// Store a newly created order in storage.
async function store(req, res) {
  try {
    const buyer = await User.findOne({ email: req.auth.email });
    if (!buyer) return res.status(400).json({ msg: "User not found" });

    const dbProducts = await Product.find(
      {
        _id: { $in: req.body.cartItems.map((cartItem) => cartItem.productId) },
      },
      "id name price",
    );

    const orderProducts = req.body.cartItems.map((cartItem) => {
      const productDB = dbProducts.find((product) => product.id === cartItem.productId);
      return {
        id: cartItem.productId,
        name: productDB.name,
        price: productDB.price,
        quantity: cartItem.quantity,
        subtotal: cartItem.quantity * productDB.price,
      };
    });

    const totalPrice = orderProducts.reduce((sum, product) => sum + product.subtotal, 0);

    const order = await Order.create({
      buyer: buyer,
      products: orderProducts,
      totalPrice: totalPrice,
      status: "not paid", // Estos hay que definir bien el string para cada uno...
      paymentMethod: null, // Same que status.. Donde deberiamos definirlos?
      address: null,
    });
    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}

async function update(req, res) {
  // Habria que asegurarse que vengan bien el paymentMethod y address antes de guardar. Middleware?
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: "paid",
        paymentMethod: req.body.order.paymentMethod,
        address: req.body.order.address,
      },
      { new: true },
    );
    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
};
