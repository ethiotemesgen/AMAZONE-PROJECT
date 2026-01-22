import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Lazy-load all pages (except Landing if you want it to load fast)
const Landing = lazy(() => import("./Pages/Landing/Landing"));
const Auth = lazy(() => import("./Pages/Auth/Auth"));
const Orders = lazy(() => import("./Pages/Orders/Orders"));
const Payment = lazy(() => import("./Pages/Payment/Payment"));
const Results = lazy(() => import("./Pages/Results/Results"));
const ProductDetails = lazy(
  () => import("./Pages/ProductDetail/Productdetail"),
);
const Cart = lazy(() => import("./Pages/Cart/Cart"));

const stripePromise = loadStripe(
  "pk_test_51Sh08D9pgs26zdmNonryxOFv2AWLfki7uKAmaEKCvoxx8FS4SiSed5C4mmraNpIBq3iDOZuTYs6GSjL2ZSuqMZrP00SV1S4g7T",
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
}

export default App;
