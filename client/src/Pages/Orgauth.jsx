import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import "./Orgauth.css";

const Orgauth = () => {
  const navigate = useNavigate();
  localStorage.removeItem("userID");
  localStorage.removeItem("name");
  localStorage.removeItem("HTML5_QRCODE_DATA");
  const api = "http://localhost:3000";

  const [isSignUp, setisSignUp] = useState(true);
  const [shopName, setShopName] = useState("");
  const [shopOwnerName, setShopOwnerName] = useState("");
  const [logoImage, setLogoImage] = useState(null); 
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    setisSignUp(!isSignUp);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const buffer = Buffer.from(reader.result);
      setLogoImage(buffer);
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", shopName);
      formData.append("shopOwner", shopOwnerName);
      formData.append("password", password);

      if (logoImage) {
        formData.append("logoImage", new Blob([logoImage]));
      }

      const response = await fetch(
        isSignUp ? `${api}/shops/register` : `${api}/shops/login`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        localStorage.setItem("name", shopName);
        navigate("/stock");
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="Orgauth">
      {isSignUp ? (
        <form onSubmit={handleSubmit}>
          <div className="top">
            <h1>New Shop Owner</h1>
          </div>
          <div className="middle">
            <p>Shop Name:</p>
            <input
              type="text"
              placeholder="Shop Name"
              name="name"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
            <p>Shop Owner Name:</p>
            <input
              type="text"
              placeholder="Shop Owner Name"
              name="shopOwnerName"
              value={shopOwnerName}
              onChange={(e) => setShopOwnerName(e.target.value)}
            />
            <p>Logo Image:</p>
            <input
              type="file"
              placeholder="Logo Image URL"
              name="logoImage"
              onChange={handleImageChange}
            />
            <p>Password:</p>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="bottom">
            <button type="button" onClick={handleSignUp}>
              Already have an account?
            </button>
            <button type="submit" id="signup">
              SignUp
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="top">
            <h1>Shop Login</h1>
          </div>
          <div className="middle">
            <p>Shop Name:</p>
            <input
              type="text"
              placeholder="Shop Name"
              name="shopOwnerName"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
            <p>Password:</p>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="bottom">
            <button onClick={handleSignUp}>Don't have an account?</button>
            <button type="submit" id="login">
              Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Orgauth;
