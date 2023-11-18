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

cartSchema.pre("save", async function (next) {
  try {
    const productPrices = await Promise.all(
      this.products.map(async (product) => {
        const productDocument = await mongoose.model("Product").findOne({
          productID: product.productID,
        });
        return productDocument ? productDocument.price : 0;
      })
    );

    const totalAmount = productPrices.reduce(
      (acc, price, index) => acc + price * this.products[index].quantity,
      0
    );

    this.total = totalAmount;

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Cart", cartSchema);
