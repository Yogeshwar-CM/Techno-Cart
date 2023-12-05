import React, { useState, useEffect } from "react";
import AdminSidebar from "../Components/AdminSidebar";

const AdminDashboard = () => {
  const [checkoutHistory, setCheckoutHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/checkout");
        const data = await response.json();
        setCheckoutHistory(data);
      } catch (error) {
        console.error("Error fetching checkout history:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <AdminSidebar />
      <div className="max-w-2xl w-full bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-6">Checkout History</h1>

        {checkoutHistory.length === 0 ? (
          <p>No checkout history available.</p>
        ) : (
          <ul>
            {checkoutHistory.map((checkout, index) => (
              <li key={index} className="border-b py-2">
                <p className="text-gray-600">
                  Total Price: ${checkout.totalAmount}
                </p>
                <p className="text-gray-600">
                  Checkout Time: {checkout.createdAt}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
