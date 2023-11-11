import React, { useState, useEffect } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import mouse from "../assets/mouse.jpg";

const ManageStock = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const baseUrl = "http://localhost:3000";

    const fetchProducts = async () => {
      const response = await fetch(`${baseUrl}/products`);
      const products = await response.json();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <AdminSidebar />

      <ul className="max-w-6xl mt-5 divide-y ml-72 divide-gray-200 dark:divide-gray-700">
        {products.map((product) => (
          <li key={product._id} className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src={mouse}
                  alt="Neil image"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate ">
                  {product.name}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {product._id}
                </p>
              </div>

              <div className="inline-flex items-center text-base font-semibold text-gray-900">
                {`Rs.${product.price}`}
              </div>
              <p className="text-sm text-gray-600 truncate">
                {`${product.stock} in stock`}
              </p>

              <div className="inline-flex rounded-md shadow-sm">
                <a
                  href="#"
                  aria-current="page"
                  className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                  Restock
                </a>
                <a
                  href="#"
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                  View Analytics
                </a>
                <a
                  href="#"
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                  Edit Product
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageStock;
