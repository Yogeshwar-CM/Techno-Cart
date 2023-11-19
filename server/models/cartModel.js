const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userID: {
    type: String,
  },
  products: [
    {
      productID: String,
      name: String,
      price: Number,
      quantity: Number,
      subTotal: {
        type: Number,
        default: function () {
          return this.price * this.quantity;
        },
      },
    },
  ],
  total: {
    type: Number,
    default: function () {
      return this.products.reduce((acc, product) => acc + product.subTotal, 0);
    },
  },
});

module.exports = mongoose.model("Cart", cartSchema);
