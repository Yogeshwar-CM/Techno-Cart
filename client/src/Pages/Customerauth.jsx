import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./customer-auth.css";

const Customerauth = () => {
  localStorage.removeItem("userID");
  localStorage.removeItem("name");
  localStorage.removeItem("HTML5_QRCODE_DATA");
  const navigate = useNavigate();
  const api = "http://localhost:3000";

  const [isSignUp, setisSignUp] = useState(true);
  const [FullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    setisSignUp(!isSignUp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        isSignUp ? `${api}/users/register` : `${api}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            FullName: FullName,
            userName: userName,
            password: password,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        localStorage.setItem("userID", data._id);
        navigate("/home");
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="Customerauth">
      {isSignUp ? (
        <form onSubmit={handleSubmit}>
          <div className="top">
            <h1>New Customer</h1>
          </div>
          <div className="middle">
            <p>FullName:</p>
            <input
              type="text"
              placeholder="Your Name"
              name="FullName"
              value={FullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <p>UserName:</p>
            <input
              type="text"
              placeholder="UserName"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
            <h1>Customer Login</h1>
          </div>
          <div className="middle">
            <p>UserName:</p>
            <input
              type="text"
              placeholder="UserName"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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

export default Customerauth;
