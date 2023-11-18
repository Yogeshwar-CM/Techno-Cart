const express = require("express");
const Router = express.Router();
const Shop = require("../models/shopModel");

Router.post("/", async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error getting shops", error: err.message });
  }
});

Router.post("/register", async (req, res) => {
  try {
    const { name, shopOwner, logoImage, password } = req.body;
    const newShop = new Shop({
      name: name,
      shopOwner: shopOwner,
      logoImage: logoImage,
      password: password,
    });
    await newShop.save();
    res.json(newShop);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering shop", error: err.message });
  }
});

Router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const shop = await Shop.findOne({
      name: name,
      password: password,
    });
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.json(shop);
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
});

Router.post("/update", async (req, res) => {
  try {
    const { shopID, name, shopOwner, logoImage, password } = req.body;
    const updatedShop = await Shop.findOneAndUpdate(
      { _id: shopID },
      { name, shopOwner, logoImage, password },
      { new: true }
    );
    if (!updatedShop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.json(updatedShop);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating shop", error: err.message });
  }
});

module.exports = Router;
