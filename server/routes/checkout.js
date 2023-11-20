const express = require("express");
const Router = express.Router();
const Cart = require("../models/cartModel");
const Checkout = require("../models/checkoutModel");
const Product = require("../models/productModel");

Router.post("/", async (req, res) => {
  try {
    const checkouts = await Checkout.find();
    res.json(checkouts);
  } catch (err) {
    res.status(500).json({
      message: "Error getting checkouts",
      error: err.message,
    });
  }
});

Router.post("/add", async (req, res) => {
  try {
    const { userID, products, totalAmount } = req.body;

    const newCheckout = new Checkout({
      userID,
      products,
      totalAmount,
    });

    await newCheckout.save();
    res.json(newCheckout);
  } catch (err) {
    res.status(500).json({
      message: "Error adding new checkout",
      error: err.message,
    });
  }
});

Router.post("/checkout", async (req, res) => {
  try {
    const userID = req.body.id;
    const cart = await Cart.findOne({ userID: userID });

    if (!cart || cart.products.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    const products = cart.products.map((product) => ({
      productID: product.productID,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
    }));
    const totalAmount = cart.total;

    const newCheckout = new Checkout({
      userID,
      products,
      totalAmount,
    });

    await newCheckout.save();

    for (const product of cart.products) {
      const existingProduct = await Product.findById(product.productID);

      if (!existingProduct) {
        console.error(`Product not found: ${product.productID}`);
        continue;
      }

      existingProduct.stock -= product.quantity;

      await existingProduct.save();
    }
    cart.products = [];
    cart.total = 0;
    await cart.save();

    res.json({ message: "Checkout successful", checkout: newCheckout });
  } catch (err) {
    res.status(500).json({
      message: "Error processing checkout",
      error: err.message,
    });
  }
});

module.exports = Router;
