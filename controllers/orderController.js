const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

// Display a listing of orders.
async function index(req, res) {}

// Display the specified order.
async function show(req, res) {
  try {
    const order = await Order.findById(req.params.id).populate({
      path: "buyer",
      populate: { path: "addresses" },
    });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

// Store a newly created order in storage.
async function store(req, res) {
  try {
    const buyer = await User.findOne({ email: req.auth.email });
    if (!buyer) return res.status(400).json({ msg: "User not found" });

    // Ver chequeo stock productos=
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
      status: "not paid",
      paymentMethod: null, // Same que status.. Donde deberiamos definirlos?
      address: null,
    });

    try {
      await User.findByIdAndUpdate(buyer._id, { $push: { orders: order._id } });
    } catch (err) {
      console.log(err);
    }

    console.log(buyer);

    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}

async function update(req, res) {
  if (req.body.address) {
    console.log(req.body.address);
    try {
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { address: req.body.address },
        { new: true },
      );
      return res.status(200).json(order);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }

  if (req.body.paymentMethod) {
    console.log(req.body.paymentMethod);
    try {
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { paymentMethod: req.body.paymentMethod },
        { new: true },
      );
      return res.status(200).json(order);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
}

module.exports = {
  index,
  show,
  store,
  update,
};
