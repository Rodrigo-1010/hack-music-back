const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
  address: [{ type: Schema.ObjectId, ref: Address }], //array con id de referencias a Address
  orders: [{ type: Schema.ObjectId, ref: Order }], //array con id de referencias a Order
});

const User = mongoose.model("User", userSchema);

module.exports = User;
