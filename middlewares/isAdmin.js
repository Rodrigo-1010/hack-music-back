const Admin = require("../models/Admin");

async function isAdmin(req, res, next) {
  if (await Admin.find({ email: req.auth.email })) {
    next();
  } else {
    res.status(403).json({ message: "Unauthorized. Admin permissions required." });
  }
}

module.exports = isAdmin;
