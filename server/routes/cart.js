const express = require("express");
const Router = express.Router();
const Cart = require("../models/cartModel");

Router.post("/", async (req, res) => {
  const cartData = await Cart.find();
  res.json(cartData);
});

Router.post("/update", async (req, res) => {
  try {
    let cart = await Cart.findOne({ userID: req.body.id });

    if (!cart) {
      cart = new Cart({ userID: req.body.id, products: [] });
    }

    console.log(cart);
    const quantity = req.body.quantity;
    const productId = req.body.productID;
    cart.products.push({ productID: productId, quantity: quantity });
    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating cart", error: err.message });
  }
});

// Delete single element inside Products based on ProductID and quantity
Router.post("/delete", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userID: req.body.id });
    const quantity = req.body.quantity;
    const productId = req.body.productID;

    const productIndex = cart.products.findIndex(
      (product) => product.productID === productId
    );
    if (productIndex === -1) {
      throw new Error("Product not found");
    }

    // Remove the product from the cart
    cart.products.splice(productIndex, 1);

    // If the product quantity is greater than 0, decrease the quantity by 1
    if (quantity > 0) {
      cart.products[productIndex].quantity -= quantity;
    }

    // If the product quantity is 0, remove the product from the cart
    if (cart.products[productIndex].quantity === 0) {
      cart.products.splice(productIndex, 1);
    }
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({
      message: "Error deleting product from cart",
      error: err.message,
    });
  }
});

// Clear every element inside the Products Object
Router.post("/clear", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userID: req.body.id });

    // Empty the Products array
    cart.products = [];

    // Save the cart changes
    await cart.save();

    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error clearing cart", error: err.message });
  }
});

module.exports = Router;
