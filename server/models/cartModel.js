const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userID: {
    type: String,
  },
  products: [
    {
      productID: String,
      quantity: Number,
    },
  ],
  total: Number,
});

module.exports = mongoose.model("Cart", cartSchema);
