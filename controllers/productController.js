const Product = require("../models/Product");
const Category = require("../models/Category");

// Display a listing of products.
async function index(req, res) {
  if (req.query.category) {
    try {
      const category = await Category.findOne({ name: req.query.category }).populate("products");
      return res.status(200).json(category);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }

  let options = {};
  if (req.query.premium) {
    options = { premium: req.query.premium };
  }
  if (req.query.categoryName) {
    options = { categoryName: req.query.categoryName };
  }

  try {
    const products = await Product.find(options);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

// Display the specified product.
async function show(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

// Store a newly created product in storage.
async function store(req, res) {
  try {
    const newProduct = await Product.create({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      picture: [],
      price: req.body.price,
      stock: req.body.stock,
      outstand: req.body.outstand,
      slug: req.body.slug,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

// Update the specified product in storage.
async function update(req, res) {
  console.log(req.body);
  const { name, category, description, price, stock, outstand, slug } = req.body;
  try {
    //SI NO ENCUENTRA EL PRODUCTO POR SU ID EN LA DB DEVUELVE 'null', AUN NO ENCONTRE COMO CONFIGURAR PARA DEVOLVER MSJ DE ERROR ACORDE.
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      { name, category, description, price, stock, outstand, slug },
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

// Remove the specified product from storage.
async function destroy(req, res) {
  try {
    // const product = await Product.findById(req.params.id);
    // if (!product) {
    //   return res.status(404).json({ msg: "Cannot find product" });
    // }
    // const removedProduct = await Product.deleteOne({ _id: req.params.id });
    // res.status(200).json(removedProduct);
    //
    //DEJO 2 VERSIONES, USANDO LA 2NDA SI NO ENCUENTRA EL PRODUCTO POR SU ID EN LA DB DEVUELVE 'null', AUN NO ENCONTRE COMO CONFIGURAR PARA DEVOLVER MSJ DE ERROR ACORDE. PRIMERA OPCION SI PODEMOS FILTRAR EN CASO NO ENCUENTRE EL PRODUCTO Y DEVOLVER MSJ ACORDE.
    //
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedProduct);
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
