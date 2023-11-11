const express = require("express");
const Router = express.Router();
const Product = require("../models/productModel");

Router.get("/", async (req, res) => {
  data = await Product.find();
  res.json(data);
});

Router.post("/getOne", async (req, res) => {
  try {
    const data = await Product.findOne({ _id: req.body.id });
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

Router.post("/updateProduct", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.body.id });

    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.stock = req.body.stock;
    product.image = req.body.image;
    product.category = req.body.category;

    await product.save();

    res.json(product);
  } catch (err) {
    res.json(err);
  }
});

Router.post("/newProduct", async (req, res) => {
  try {
    const data = await new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      image: req.body.image,
      category: req.body.category,
    });
    data.save();
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

module.exports = Router;
