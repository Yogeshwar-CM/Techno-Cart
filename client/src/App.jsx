import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Pages/welcome";
import Stock from "./Pages/Stock";
import CustomerHome from "./Pages/CustomerHome";
import Scan from "./Pages/Scan";
import ManageStock from "./Pages/ManageStock";
import Orgauth from "./Pages/Orgauth";
import Cart from "./Pages/cart";
import Nopage from "./Pages/Nopage";
import Customerauth from "./Pages/customerauth";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/auth" element={<Customerauth />}></Route>
        <Route path="/auth/org" element={<Orgauth />}></Route>
        <Route path="/scan" element={<Scan />}></Route>
        <Route path="/home" element={<CustomerHome />}></Route>
        <Route path="/stock" element={<Stock />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/stock/manage" element={<ManageStock />}></Route>
        <Route path="*" element={<Nopage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
