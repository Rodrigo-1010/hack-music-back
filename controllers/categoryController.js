const Category = require("../models/Category");

// Display a listing of categories.
async function index(req, res) {
  try {
    const categories = await Category.find().populate("products");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

// Display the specified category.
async function show(req, res) {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

// Store a newly created category in storage.
async function store(req, res) {
  try {
    const newCategory = await Category.create({
      name: req.body.name,
      description: req.body.description,
      slug: req.body.slug,
    });
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

// Update the specified category in storage.
async function update(req, res) {
  const { name, description, slug } = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      { name, description, picture, slug },
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

// Remove the specified category from storage.
async function destroy(req, res) {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
