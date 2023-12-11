import React, { useState, useEffect } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import "./Users.css";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    // <div className="users-container">
    //   <AdminSidebar />
    //   <h2>User List</h2>
    //   <ul className="user-list">
    //     {users.map((user) => (
    //       <li key={user._id} className="user-item">
    //         <div className="user-details">
    //           <span className="fullname">{user.fullname}</span>
    //           <span className="username">@{user.username}</span>
    //         </div>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <div className="w-[100vw] h-[100vh] bg-[#f1f1f1]">
      <AdminSidebar />
      <div className="w-full h-full flex items-center justify-center">
        <div className="bg-white w-[600px] p-6">
          <h2 className="text-[24px] mb-[20px] text-[#333]">User List</h2>
          <ul className="w-full">
            {users.map((user) => (
              <li key={user._id} className="w-full mb-2 border-b-2 p-2">
                <div className="w-full flex items-center justify-between">
                  <span className="fullname">{user.fullname}</span>
                  <span className="username">@{user.username}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
