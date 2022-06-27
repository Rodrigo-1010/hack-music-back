//Model instantiation
const Category = require("../models/Category");
const Product = require("../models/Product");

//Categories seed and package import.
const categoriesSeed = require('./categories')
const slugify = require("slugify");


const slugifyOptions = {
  replacement: "-", // replace spaces with replacement character, defaults to `-`
  remove: undefined, // remove characters that match regex, defaults to `undefined`
  lower: true, // convert to lower case, defaults to `false`
  strict: false, // strip special characters except replacement, defaults to `false`
  locale: "vi", // language code of the locale to use
  trim: true, // trim leading and trailing replacement chars, defaults to `true`
};



for (const category of categoriesSeed) {
  category.slug = category.name;
  category.products = [];
}

const createCategories = async () => {
  return await Category.insertMany(categoriesSeed);
};

const assignProductsToCategories = async (categories, products) => {
  for (const category of categories) {
    for (const product of products) {
      if (product.categoryId === category._id) {
        category.products.push(product);
      }
    }
    await Category.findOneAndUpdate({ _id: category._id }, { products: category.products });
  }
};

module.exports = { createCategories, assignProductsToCategories };
