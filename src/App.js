import React from "react";

import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Notification from "./pages/Notification";
import Orders from "./pages/Orders";
import Manage from "./pages/Manage";


export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/manage" element={<Manage/>} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/users" element={<Users />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Router>
    </div>
  );
}