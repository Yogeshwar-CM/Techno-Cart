import React, { useState, useEffect } from "react";
import Scanicon from "../Components/Scanicon";
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
        setProducts(productData); // Set the retrieved products in the state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div>
      <Scanicon />
      <h1 className="text-xl">CART</h1>

      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {products && products.length > 0 ? (
          products.map((product, index) => (
            <li key={index} className="pb-3 sm:pb-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img className="w-8 h-8 rounded-full" src={Shoe} alt="img" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{product.productID}</p>
                </div>
                <div className="inline-flex items-center text-base font-semibold">
                  ${product.quantity}
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>No products in the cart.</p>
        )}
      </ul>
    </div>
  );
};

export default Cart;
