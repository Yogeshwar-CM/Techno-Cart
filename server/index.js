const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is TechnoCart's Server");
});

const productRouter = require("./routes/products");
app.use("/products", productRouter);

const userRouter = require("./routes/user");
app.use("/users", userRouter);

const cartRouter = require("./routes/cart");
app.use("/cart", cartRouter);

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGODB_URL)
  .then(
    app.listen(PORT, () => {
      console.log(`\nServer is running on port ${process.env.PORT}\n`);
    })
  )
  .catch((err) => console.log(err));
