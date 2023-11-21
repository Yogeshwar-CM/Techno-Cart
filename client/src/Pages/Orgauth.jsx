import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    setisSignUp(!isSignUp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        isSignUp ? `${api}/shops/register` : `${api}/shops/login`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            shopOwner: shopOwnerName,
            name: shopName,
            password: password,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("name", shopName);
        navigate("/stock");
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="Orgauth bg-gray-100 min-h-screen flex items-center justify-center">
      <form className="bg-white p-8 rounded shadow-md max-w-md w-full" onSubmit={handleSubmit}>
        <div className="top text-2xl font-bold mb-4">
          {isSignUp ? "New Shop Owner" : "Shop Login"}
        </div>
        <div className="middle">
          <p className="text-xl mb-2">Shop Name:</p>
          <input
            type="text"
            placeholder="Shop Name"
            name="shopName"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded border"
          />
          {isSignUp && (
            <>
              <p className="text-xl mb-2">Shop Owner:</p>
              <input
                type="text"
                placeholder="Shop Owner Name"
                name="shopOwnerName"
                value={shopOwnerName}
                onChange={(e) => setShopOwnerName(e.target.value)}
                className="w-full mb-4 px-4 py-2 rounded border"
              />
            </>
          )}
          <p className="text-xl mb-2">Password:</p>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 px-4 py-2 rounded border"
          />
        </div>
        <div className="bottom flex items-center">
          <button
            type="button"
            onClick={handleSignUp}
            className="text-sm text-gray-600 hover:underline cursor-pointer mr-4"
          >
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
          </button>
          <button
            type="submit"
            id={isSignUp ? "signup" : "login"}
            className="text-white bg-gray-800 px-4 py-2 rounded cursor-pointer"
          >
            {isSignUp ? "SignUp" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Orgauth;
