const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  products: [
    {
      productID: String,
      name: String,
      price: Number,
      quantity: Number,
      category: String,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Checkout", checkoutSchema);
