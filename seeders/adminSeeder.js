//Model instantiation
const Admin = require("../models/Admin");

//Admin seed and package import.
const adminSeed = require("./admin");

const createAdmin = async () => {
  const admin = new Admin(adminSeed);
  return await admin.save();
};

module.exports = { createAdmin };
