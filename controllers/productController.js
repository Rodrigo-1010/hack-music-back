const Product = require("../models/Product");
const Category = require("../models/Category");
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

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
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    console.log(fields);
    console.log(files);

    const ext = path.extname(files.picture.filepath);
    const newFileName = `image_${Date.now()}${ext}`;
    const { data, error } = await supabase.storage
      .from("hack-music-images")
      .upload(newFileName, fs.createReadStream(files.picture.filepath), {
        cacheControl: "3600",
        upsert: false,
        contentType: files.picture.mimetype,
      });

    try {
      const newProduct = await Product.create({
        name: fields.name,
        categoryName: fields.category,
        description: fields.description,
        picture: [
          "https://imbprxqctiygtzzeoghm.supabase.co/storage/v1/object/public/hack-music-images/" +
            newFileName,
        ],
        price: fields.price,
        stock: fields.stock,
        premium: fields.premium,
        slug: fields.slug,
      });
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  });
}

// Update the specified product in storage.
async function update(req, res) {
  console.log(req.body);
  const { name, categoryName, description, price, stock, premium, slug } = req.body;
  try {
    //SI NO ENCUENTRA EL PRODUCTO POR SU ID EN LA DB DEVUELVE 'null', AUN NO ENCONTRE COMO CONFIGURAR PARA DEVOLVER MSJ DE ERROR ACORDE.
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      { name, categoryName, description, price, stock, premium, slug },
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
