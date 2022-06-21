const Category = require("../models/Category");

// Display a listing of categories.
async function index(req, res) {
  const categories = await Category.find();
  res.json({ msg: "Hola" });
}

// Display the specified category.
async function show(req, res) {}

// Store a newly created category in storage.
async function store(req, res) {}

// Update the specified category in storage.
async function update(req, res) {}

// Remove the specified category from storage.
async function destroy(req, res) {}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
