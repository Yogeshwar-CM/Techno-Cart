import React, { useState, useEffect } from "react";
import Scanicon from "../Components/Scanicon";
import "./cart.css";
import { useNavigate } from "react-router-dom";

import jsPDF from "jspdf";

const Cart = () => {
  const Navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [totalPrice, settotalPrice] = useState(0);
  const baseUrl = "http://localhost:3000";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${baseUrl}/cart/getUserCart`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: localStorage.getItem("userID"),
          }),
        });
        const cartData = await response.json();
        settotalPrice(cartData.total);
        const productData = cartData.products;
        setProducts(productData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, []);

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const response = await fetch(`${baseUrl}/cart/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: localStorage.getItem("userID"),
          productID: productId,
          quantity: newQuantity,
        }),
      });

      if (!response.ok) {
        console.error(`Failed to update quantity: ${response.statusText}`);
        return;
      }
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(`${baseUrl}/cart/clear`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: localStorage.getItem("userID"),
        }),
      });

      if (response.ok) {
        console.log("Cart cleared successfully");
        setProducts([]);
        settotalPrice(0);
      } else {
        window.alert(`Failed to clear cart: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(`${baseUrl}/checkout/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: localStorage.getItem("userID"),
        }),
      });

      if (response.ok) {
        console.log("Checkout successful");

        const cartData = await response.json();
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Receipt", 80, 10, null, null, "center");

        doc.line(20, 15, 190, 15);

        doc.setFontSize(12);

        if (Array.isArray(cartData.checkout.products)) {
          cartData.checkout.products.forEach((product, index) => {
            const y = 30 + index * 10;
            console.log(product);
            doc.text(
              `${product.name} x${product.quantity} - $${
                product.price * product.quantity
              }`,
              80,
              y,
              null,
              null,
              "center"
            );
          });
        } else {
          console.error("Invalid products data format");
          return;
        }

        doc.line(
          20,
          40 +
            (cartData.checkout.products
              ? cartData.checkout.products.length * 10
              : 0),
          190,
          40 +
            (cartData.checkout.products
              ? cartData.checkout.products.length * 10
              : 0)
        );
        doc.text(
          `Total: $${cartData.checkout.totalAmount || 0}`,
          80,
          50 +
            (cartData.checkout.products
              ? cartData.checkout.products.length * 10
              : 0),
          null,
          null,
          "center"
        );

        doc.text(
          `Date: ${new Date(cartData.checkout.date).toLocaleDateString()}`,
          80,
          60 +
            (cartData.checkout.products
              ? cartData.checkout.products.length * 10
              : 0),
          null,
          null,
          "center"
        );
        doc.text(
          `Time: ${new Date(cartData.checkout.date).toLocaleTimeString()}`,
          80,
          70 +
            (cartData.checkout.products
              ? cartData.checkout.products.length * 10
              : 0),
          null,
          null,
          "center"
        );

        doc.text(
          `User ID: ${cartData.checkout.userID}`,
          80,
          80 +
            (cartData.checkout.products
              ? cartData.checkout.products.length * 10
              : 0),
          null,
          null,
          "center"
        );

        doc.save("receipt.pdf");

        setProducts([]);
        settotalPrice(0);
        Navigate("/home");
      } else {
        window.alert(`Failed to checkout: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main-cart">
      <div className="cart">
        <Scanicon />
        <h1 className="text-xl">CART</h1>
        <div className="cart-body">
          {products.map((product) => (
            <div key={product.productID} className="set">
              <span>{product.name}</span>
              <span>
                <input
                  type="number"
                  placeholder={product.quantity}
                  onBlur={(e) =>
                    handleQuantityChange(product.productID, e.target.value)
                  }
                />
              </span>
              <span>{product.subTotal}</span>
            </div>
          ))}
        </div>
        <div className="cart-foot">
          <button onClick={clearCart}>Clear</button>
          <button onClick={handleCheckout}>Checkout</button>
          <p>Total: {totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
