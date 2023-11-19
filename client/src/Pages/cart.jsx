import React, { useState, useEffect } from "react";
import Scanicon from "../Components/Scanicon";
import "./cart.css";
import Shoe from "../assets/shoe.jpg";

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const baseUrl = "http://localhost:3000";
        const response = await fetch(`${baseUrl}/cart`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: "user1",
          }),
        });
        const cartData = await response.json();
        const productData = cartData[0].products;
        console.log(productData);
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    setTimeout(() => {
      fetchProduct();
    }, 100);
  }, []);

  return (
    <div className="main-cart">
      <div className="cart">
        <Scanicon />
        <h1 className="text-xl">CART</h1>
        <div className="cart-body">
          <div className="set">
            <span>Product Name</span>
            <span>Quantity</span>
            <span>Price</span>
          </div>
        </div>
        <div className="cart-foot">
          <button>Clear</button>
          <button>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
