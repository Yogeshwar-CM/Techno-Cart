const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  image: String,
  category: String,
});

module.exports = mongoose.model("Product", productSchema);
