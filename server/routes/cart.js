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

    const quantity = req.body.quantity;
    const productId = req.body.productID;

    const productIndex = cart.products.findIndex(
      (product) => product.productID === productId
    );

    if (productIndex !== -1) {
      cart.products[productIndex].quantity = quantity;

      cart.products[productIndex].subTotal =
        cart.products[productIndex].price *
        cart.products[productIndex].quantity;
    } else {
      const { name, price } = req.body;

      cart.products.push({
        productID: productId,
        name: name,
        price: price,
        quantity: quantity, 
        subTotal: price * quantity,
      });
    }
    cart.total = cart.products.reduce(
      (acc, product) => acc + product.subTotal,
      0
    );

    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating cart", error: err.message });
  }
});

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

    if (quantity > 0) {
      cart.products[productIndex].quantity -= quantity;
    }
    if (cart.products[productIndex].quantity <= 0) {
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

Router.post("/clear", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userID: req.body.id });
    cart.products = [];

    await cart.save();

    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error clearing cart", error: err.message });
  }
});

module.exports = Router;
