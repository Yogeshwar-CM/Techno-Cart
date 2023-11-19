const express = require("express");
const Router = express.Router();
const Product = require("../models/productModel");
const Shop = require("../models/shopModel");

Router.get("/", async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting products", error: err.message });
  }
});

Router.post("/mystock", async (req, res) => {
  const sID = req.body.shopID;
  console.log(sID);

  try {
    const products = await Product.find({ shopID: sID, stock: { $gt: 0 } });

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No products found with stock for the given shopID",
      });
    }

    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting products", error: err.message });
  }
});

Router.post("/myprods", async (req, res) => {
  const shopID = req.body.shopID;

  try {
    const products = await Product.find({ shopID: shopID });

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the given shopID" });
    }

    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting products", error: err.message });
  }
});

Router.post("/getOne", async (req, res) => {
  try {
    const data = await Product.findOne({ _id: req.body.productID });
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting product", error: err.message });
  }
});

Router.post("/updateProduct", async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.body.productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.stock = req.body.stock;
    product.image = req.body.image;
    product.category = req.body.category;

    await product.save();

    res.json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating product", error: err.message });
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
      shopID: req.body.shopID,
    });

    await data.save();
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating product", error: err.message });
  }
});
Router.post("/restock", async (req, res) => {
  try {
    const { productId, amount } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.stock += parseInt(amount);

    await product.save();

    res.json({ message: "Stock updated successfully", product });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating stock", error: err.message });
  }
});

module.exports = Router;
