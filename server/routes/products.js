const express = require("express");
const Router = express.Router();
const sharp = require("sharp");
const Product = require("../models/productModel");
const multer = require("multer");

Router.post("/", async (req, res) => {
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

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

Router.post("/newProduct", upload.single("image"), async (req, res) => {
  const { name, description, shopID, price, stock, category } = req.body;

  const imageBuffer = req.file.buffer;

  try {
    const compressedImageBuffer = await sharp(imageBuffer)
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    const data = await new Product({
      name,
      description,
      price,
      stock,
      image: compressedImageBuffer,
      category,
      shopID,
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
