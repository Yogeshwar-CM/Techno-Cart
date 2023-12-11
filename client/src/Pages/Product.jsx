import React, { useState, useEffect } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import "./Product.css";
import JsBarcode from "jsbarcode";
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
  const downloadBarcode = (productId) => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, productId, {
      format: "CODE128",
      displayValue: false,
      fontSize: 12,
    });

    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${productId}_barcode.png`;

    link.click();
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
    // <div className="Product">
    //   <AdminSidebar />
    //   <div className="main">
    //     <div className="bar">
    //       <button
    //         className="add-button"
    //         onClick={() => {
    //           setnewprodState(!newprodState);
    //           setnewprodText(newprodState ? "New Product" : "Close Window");
    //         }}
    //       >
    //         {newprodText}
    //       </button>
    //     </div>
    //     <div className="body">
    //       {newprodState ? <NewProduct /> : null}
    //       <ul className="product-list">
    //         {products.map((product) => (
    //           <li key={product._id} className="product-item">
    //             <div className="product-details">
    //               <span>
    //                 <svg
    //                   className="w-6 h-6 text-gray-800 ml-2 mt-1 cursor-pointer"
    //                   aria-hidden="true"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   fill="none"
    //                   viewBox="0 0 16 18"
    //                   onClick={() => downloadBarcode(product._id)}
    //                 >
    //                   <path
    //                     stroke="currentColor"
    //                     stroke-linecap="round"
    //                     stroke-linejoin="round"
    //                     stroke-width="2"
    //                     d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
    //                   />
    //                 </svg>
    //               </span>
    //               <span className="product-name">{product.name}</span>
    //               <span className="product-price">Rs.{product.price}</span>
    //               <span className="product-stock">
    //                 In Stock: {product.stock}
    //               </span>
    //               <span>
    //                 <input
    //                   type="number"
    //                   placeholder="  Amount"
    //                   onChange={(e) => setRestockAmount(e.target.value)}
    //                 ></input>
    //               </span>
    //               <span>
    //                 <button
    //                   onClick={() => handleRestock(product._id, RestockAmount)}
    //                 >
    //                   Add Stock
    //                 </button>
    //               </span>
    //             </div>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   </div>
    // </div>
    <div className="w-[100vw] h-[100vh] flex">
      <AdminSidebar />
      <div className="w-full h-full flex flex-col items-center justify-start p-3">
        <div className="bg-[#f0f0f0] p-3 w-1/2">
          <button
            className="bg-[#111827] text-white px-3 py-2 rounded-[5px]"
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
                      className="w-6 h-6 text-gray-800 ml-2 mt-1 cursor-pointer"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 18"
                      onClick={() => downloadBarcode(product._id)}
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                      />
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
