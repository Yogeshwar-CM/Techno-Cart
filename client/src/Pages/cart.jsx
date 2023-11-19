import React, { useState, useEffect } from "react";
import Scanicon from "../Components/Scanicon";
import "./cart.css";

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
            id: localStorage.getItem("userID"),
          }),
        });
        const cartData = await response.json();
        const productData = cartData[0].products;

        setProducts(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="main-cart">
      <div className="cart">
        <Scanicon />
        <h1 className="text-xl">CART</h1>
        <div className="cart-body">
          {products.map((product) => (
            <div key={product.productID} className="set">
              {/* <span>{product.name}</span> */}
              <span>{product.quantity}</span>
              <span>{product.price}</span>
            </div>
          ))}
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
