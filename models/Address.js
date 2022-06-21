const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  line1: String,
  line2: String,
  postalCode: Number,
  country: String,
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
