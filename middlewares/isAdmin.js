//Somos todos conscientes de que esto no es lo más seguro!

function isAdmin(req, res, next) {
  if (req.auth.email.includes("@admin")) {
    next();
  } else {
    res.status(403).json({ message: "Admins only" });
  }
}

module.exports = isAdmin;
