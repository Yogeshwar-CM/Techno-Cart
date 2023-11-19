import React, { useState } from "react";
import "./NewProduct.css";

const NewProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const shopName = localStorage.getItem("name");
  const api = "http://localhost:3000";

  const getShopID = async () => {
    try {
      const response = await fetch(`${api}/shops/getShopInfo`, {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sID = await getShopID();

    try {
      const response = await fetch(`${api}/products/newProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: productName,
          description: description,
          image: image,
          shopID: sID,
          price: price,
          stock: stock,
          category: category,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Product added successfully:", data);
      } else {
        const errorData = await response.json();
        console.error("Error adding product:", errorData);
      }
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  return (
    <div className="newprodcard">
      <h2>Add New Product</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="image">Logo</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
