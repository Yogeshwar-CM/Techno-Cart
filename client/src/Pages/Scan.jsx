import  React,{ useEffect } from "react";
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
        scanner.clear();
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
          console.log(cartResponse.json());
          navigate("/cart");

        if (!cartResponse.ok) {
          console.error(`Failed to update cart: ${cartResponse.statusText}`);
          return;
        }

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
    <div className=" bg-[#FFF4F4] mx-auto px-4 flex flex-col justify-center items-center h-screen">
    <div className="bg-[#2c2c2c] rounded-md p-6">
      <h1 className="text-lg font-semibold text-center md:text-4xl pb-6 text-[#FFF4F4] px-3">QR Code Scanner</h1>
      <div id="reader" className="rounded-lg border-none cursor-pointer p-2 flex justify-center items-center flex-col h-[300px] bg-[#FFF4F4]"></div>
    </div>
    </div>
  );
};

export default Scan;
