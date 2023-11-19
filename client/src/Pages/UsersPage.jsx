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
    <div className="users-container">
      <AdminSidebar />
      <h2>User List</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user._id} className="user-item">
            <div className="user-details">
              <span className="fullname">{user.fullname}</span>
              <span className="username">@{user.username}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
