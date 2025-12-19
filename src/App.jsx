import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Results from "./Pages/Results/Results";
import ProductDetails from "./Pages/ProductDetail/Productdetail";
import Cart from "./Pages/Cart/Cart"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/results/:categoryName" element={<Results />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} /> {/* <-- Add this route */}
    </Routes>
  );
}

export default App;
