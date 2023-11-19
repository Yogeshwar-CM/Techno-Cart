import React, { useState, useEffect } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import "./Product.css";
import NewProduct from "../Components/NewProduct";

const Product = () => {
  const [newprodState, setnewprodState] = useState(false);
  const [newprodText, setnewprodText] = useState("New Product");
  const [products, setProducts] = useState([]);
  const shopName = localStorage.getItem("name");
  const [RestockAmount, setRestockAmount] = useState(0);
  const baseUrl = "http://localhost:3000";
  const handleRestock = async (productId, amount) => {
    try {
      const response = await fetch(`${baseUrl}/products/restock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
          amount: amount,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to restock product: ${response.statusText}`);
      }
      const sID = await getShopID();
      const productsResponse = await fetch(`${baseUrl}/products/myprods`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shopID: sID,
        }),
      });

      if (!productsResponse.ok) {
        throw new Error(
          `Failed to fetch products after restocking: ${productsResponse.statusText}`
        );
      }

      const updatedProducts = await productsResponse.json();
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error restocking product:", error.message);
    }
  };

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
        const response = await fetch(`${baseUrl}/products/myprods`, {
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
  }, [baseUrl, shopName]);

  return (
    <div className="Product">
      <AdminSidebar />
      <div className="main">
        <div className="bar">
          <button
            className="add-button"
            onClick={() => {
              setnewprodState(!newprodState);
              setnewprodText(newprodState ? "New Product" : "Close Window");
            }}
          >
            {newprodText}
          </button>
        </div>
        <div className="body">
          {newprodState ? <NewProduct /> : null}
          <ul className="product-list">
            {products.map((product) => (
              <li key={product._id} className="product-item">
                <div className="product-details">
                  <span>
                    <svg
                      class=" text-gray-800 settings-icon"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M1 5h1.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 1 0 0-2H8.576a3.228 3.228 0 0 0-6.152 0H1a1 1 0 1 0 0 2Zm18 4h-1.424a3.228 3.228 0 0 0-6.152 0H1a1 1 0 1 0 0 2h10.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 0 0 0-2Zm0 6H8.576a3.228 3.228 0 0 0-6.152 0H1a1 1 0 0 0 0 2h1.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 0 0 0-2Z" />
                    </svg>
                  </span>
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">Rs.{product.price}</span>
                  <span className="product-stock">
                    In Stock: {product.stock}
                  </span>
                  <span>
                    <input
                      type="number"
                      placeholder="  Amount"
                      onChange={(e) => setRestockAmount(e.target.value)}
                    ></input>
                  </span>
                  <span>
                    <button
                      onClick={() => handleRestock(product._id, RestockAmount)}
                    >
                      Add Stock
                    </button>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Product;
