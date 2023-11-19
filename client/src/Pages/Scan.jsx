import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

const Scan = () => {
  const navigate = useNavigate();
  const BaseURL = "http://localhost:3000";

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 900,
        height: 375,
      },
      fps: 5,
    });

    scanner.render(scannerSuccess, scannerFailure);

    async function scannerSuccess(result) {
      try {
        const userID = localStorage.getItem("userID");
        const productResponse = await fetch(`${BaseURL}/products/getOne`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productID: result,
          }),
        });

        if (!productResponse.ok) {
          console.error(
            `Failed to fetch product details: ${productResponse.statusText}`
          );
          return;
        }
        const productData = await productResponse.json();
        console.log(productData);
        const { name, price } = productData;
        console.log(name);

        const cartResponse = await fetch(`${BaseURL}/cart/update`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: userID,
            productID: result,
            name: name,
            price: price,
            quantity: 1,
          }),
        });

        if (!cartResponse.ok) {
          console.error(`Failed to update cart: ${cartResponse.statusText}`);
          return;
        }

        scanner.clear();
        navigate("/cart");
      } catch (error) {
        console.error("Error processing scan:", error.message);
      }
    }

    function scannerFailure(error) {
      console.warn(error);
    }

    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <div id="reader"></div>
    </div>
  );
};

export default Scan;
