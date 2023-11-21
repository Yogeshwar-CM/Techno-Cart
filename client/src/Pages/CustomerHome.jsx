import Scanicon from "../Components/Scanicon";
import React from "react";

const CustomerHome = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <Scanicon />
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="text-gray-600 mb-6">
          Discover a wide range of products tailored for you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-200 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Latest Products</h2>
          </div>
          <div className="bg-green-200 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Special Offers</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;
