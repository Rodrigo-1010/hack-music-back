const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  streetAddress: String,
  city: String,
  country: String,
  postalCode: Number,
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
