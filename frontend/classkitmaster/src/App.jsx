import React from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Layout/Home";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";

import ProductsPage from "./pages/ProductsPage";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";

import AdminAddProduct from "./pages/Admin/AdminAddProduct";
import AdminEditPage from "./pages/Admin/AdminEditPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-center" />

      {/* Header */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:category" element={<ProductsPage />} />


        {/*adminDashBoard*/}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AdminAddProduct />} />
        <Route path="/admin/edit-product/:id" element={<AdminEditPage />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
