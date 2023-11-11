import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

const Scan = () => {
  const navigate = useNavigate();
  const BaseURL = "http://localhost:3000";
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 750,
        height: 300,
      },
      fps: 5,
    });

    scanner.render(scannerSuccess, scannerFailure);

    function scannerSuccess(result) {
      scanner.clear();

      const data = fetch(`${BaseURL}/cart/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: "user1",
          productID: result,
          quantity: 1,
        }),
      });

      navigate("/cart");
    }
    function scannerFailure(error) {
      console.warn(error);
    }
  }, []);

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <div id="reader"></div>
    </div>
  );
};

export default Scan;
