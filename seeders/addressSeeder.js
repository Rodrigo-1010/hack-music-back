const addressSeed = require("./address");
const Address = require("../models/Address");

async function assignUserToAddress(userId) {
  const address = await Address.create({ user: userId, ...addressSeed });
  return address;
}

module.exports = { assignUserToAddress };
