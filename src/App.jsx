import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Orders from "./Pages/Orders/Orders";
import Payment from "./Pages/Payment/Payment";
import Results from "./Pages/Results/Results";
import ProductDetails from "./Pages/ProductDetail/Productdetail";
import Cart from "./Pages/Cart/Cart";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Sh08D9pgs26zdmNonryxOFv2AWLfki7uKAmaEKCvoxx8FS4SiSed5C4mmraNpIBq3iDOZuTYs6GSjL2ZSuqMZrP00SV1S4g7T"
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/orders" element={<Orders />} />
      <Route
        path="/payment"
        element={
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        }
      />
      <Route path="/results/:categoryName" element={<Results />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
  );
}

export default App;
