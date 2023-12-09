// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Pages/welcome";
import Stock from "./Pages/Stock";
import CustomerHome from "./Pages/CustomerHome";
import Scan from "./Pages/Scan";
import ManageStock from "./Pages/Analytics";
import Orgauth from "./Pages/Orgauth";
import Product from "./Pages/Product";
import AdminDashboard from "./Pages/Analytics";
import Cart from "./Pages/cart";
import Nopage from "./Pages/Nopage";
import Users from "./Pages/UsersPage";
import Customerauth from "./Pages/Customerauth";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/dashboard" element={<AdminDashboard />}></Route>
        <Route path="/auth" element={<Orgauth />}></Route>
        <Route path="/scan" element={<Scan />}></Route>
        <Route path="/home" element={<CustomerHome />}></Route>
        <Route path="/products" element={<Product />}></Route>
        <Route path="/auth/customer" element={<Customerauth />}></Route>
        <Route path="/stock" element={<Stock />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/stock/manage" element={<ManageStock />}></Route>
        <Route path="*" element={<Nopage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
