import React from "react";
import { Link } from "react-router-dom";
import "./welcome.css";

const Welcome = () => {
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
          <Link to="/auth">I am a Customer</Link>
        </h1>
        <h1 className="button-org">
          <Link to="/auth/org">Organization</Link>
        </h1>
      </div>
    </div>
  );
};

export default Welcome;
