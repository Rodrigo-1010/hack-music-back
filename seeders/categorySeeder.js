const Category = require("../models/Category");
const Product = require("../models/Product");
const slugify = require("slugify");

const slugifyOptions = {
  replacement: "-", // replace spaces with replacement character, defaults to `-`
  remove: undefined, // remove characters that match regex, defaults to `undefined`
  lower: true, // convert to lower case, defaults to `false`
  strict: false, // strip special characters except replacement, defaults to `false`
  locale: "vi", // language code of the locale to use
  trim: true, // trim leading and trailing replacement chars, defaults to `true`
};

const categoriesSeed = [
  {
    name: "drums-and-percussion",
    alias: "Drums & Percussion",
    img: "https://i.postimg.cc/d1H3H9wF/category-card-percussion.jpg",
  },
  {
    name: "guitar-and-bass",
    alias: "Guitar & Bass",
    img: "https://i.postimg.cc/gk6rrjfV/category-card-strings.jpg",
  },
  {
    name: "wind-instruments",
    alias: "Wind instruments",
    img: "https://i.postimg.cc/vZFTnMsp/category-card-wind.jpg",
  },
  {
    name: "keyboards-and-pianos",
    alias: "Keyboards & Pianos",
    img: "https://i.postimg.cc/NGn5gmPG/category-card-keyboards.jpg",
  },
  {
    name: "accessories",
    alias: "Accessories",
    img: "https://i.postimg.cc/ZnXRVzyv/category-card-accessories.jpg",
  },
];

for (const category of categoriesSeed) {
  category.slug = category.name;
  category.products = [];
}

const categorySeeder = async () => {
  const products = await Product.find();

  for (const product of products) {
    for (const category of categoriesSeed) {
      if (category.name === product.category) {
        category.products.push(product);
      }
    }
  }

  // For checking length of products in category
  // for (const category of categoriesSeed) {
  //   console.log(category.name + ": " + category.products.length);
  // }

  await Category.deleteMany({});
  await Category.insertMany(categoriesSeed);
};

module.exports = categorySeeder;
