import React from "react";
import scan from "../assets/scan.jpg";
import { Link } from "react-router-dom";

const Scanicon = () => {
  return (
    <div>
      <Link to="/scan">
        <img
          src={scan}
          alt="Scan"
          className="fixed right-0 bottom-0 m-8 z-50 w-20 bg-white p-2 rounded-md cursor-pointer"
        />
      </Link>
    </div>
  );
};

export default Scanicon;
