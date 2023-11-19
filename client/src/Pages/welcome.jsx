import React from "react";
import { Link } from "react-router-dom";
import "./welcome.css";

const Welcome = () => {
  localStorage.removeItem("userID");
  localStorage.removeItem("name");
  localStorage.removeItem("HTML5_QRCODE_DATA");
  return (
    <div className="welcome">
      <div className="left">
        <h1 className="HERO-1">TECHNO CART</h1>
        <p className="welcome-text">
          The Ultimate solution for small scale shops
        </p>
      </div>
      <div className="right">
        <h1 className="button-customer">
          <Link to="/auth/customer">I am a Customer</Link>
        </h1>
        <h1 className="button-org">
          <Link to="/auth">Organization</Link>
        </h1>
      </div>
    </div>
  );
};

export default Welcome;
