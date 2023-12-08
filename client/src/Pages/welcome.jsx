// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import "./welcome.css";

const Welcome = () => {
  localStorage.removeItem("userID");
  localStorage.removeItem("name");
  localStorage.removeItem("HTML5_QRCODE_DATA");
  return (
    // <div className="welcome">
    //   <div className="left">
    //     <h1 className="HERO-1">TECHNO CART</h1>
    //     <p className="welcome-text">
    //       The Ultimate solution for small scale shops
    //     </p>
    //   </div>
    //   <div className="right">
    //     <h1 className="button-customer">
    //       <Link to="/auth/customer">I am a Customer</Link>
    //     </h1>
    //     <h1 className="button-org">
    //       <Link to="/auth">Organization</Link>
    //     </h1>
    //   </div>
    // </div>
    <div className="font-[roboto] w-[100vw] h-[100vh] lg:flex lg:flex-row lg:items-center lg:justify-center sm:flex sm:flex-col sm:items-center sm:justify-center">
      <div className="lg:mr-8 lg:mb-0 lg:text-left sm:mb-8 sm:mr-0 sm:text-center">
        <h1 className="text-[4rem]">TECHNO CART</h1>
        <p className="text-[1.2rem]">
          The Ultimate solution for small scale shops
        </p>
      </div>
      <div className="lg:ml-8 lg:mt-0 sm:mt-8 sm:ml-0">
        <h1 className="bg-[#2c2c2c] text-white p-3 text-lg mb-2 text-center">
          <Link to="/auth/customer">I am a Customer</Link>
        </h1>
        <h1 className="bg-[#2c2c2c] text-white p-3 text-lg mt-2 text-center">
          <Link to="/auth">Organization</Link>
        </h1>
      </div>
    </div>
  );
};

export default Welcome;
