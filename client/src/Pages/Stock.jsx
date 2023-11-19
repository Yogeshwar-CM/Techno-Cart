import React, { useEffect, useState } from "react";
import Bag from "../assets/bag.jpg";
import Mouse from "../assets/mouse.jpg";
import Bike from "../assets/bike.jpg";
import AdminSidebar from "../Components/AdminSidebar";

const Stock = () => {
  const [products, setProducts] = useState([]);
  const shopName = localStorage.getItem("name");
  const baseUrl = "http://localhost:3000";

  const getShopID = async () => {
    try {
      const response = await fetch(`${baseUrl}/shops/getShopInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: shopName,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        return data.shopID;
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const sID = await getShopID();
        const response = await fetch(`${baseUrl}/products/mystock`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            shopID: sID,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const products = await response.json();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <AdminSidebar />
      <div className="flex flex-wrap left-72 absolute">
        {products.map((product) => (
          <div className="w-full shadow-2xl shadow-blue-950 max-w-xs mt-4 ml-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img className="p-8 rounded-t-lg" src={Bag} alt="product image" />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {product.name}
                </h5>
              </a>
              <div className="flex items-center justify-between mt-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {product.stock}
                </span>
                <a
                  href="stock/manage"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Analytics
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stock;
