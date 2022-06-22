const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
  address: { type: [], ref: Address }, //array con id de referencias a Address
  orders: { type: [], ref: Order }, //array con id de referencias a Order
});

const User = mongoose.model("User", userSchema);

module.exports = User;
