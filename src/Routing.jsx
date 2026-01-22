import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing.jsx";
import SignIn from "./Pages/Auth/SignIn.jsx";
import Payment from "./Pages/Payment/Payment.jsx";
import Orders from "./Pages/Orders/Orders.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import Results from "./Pages/Results/Results.jsx";
import ProductDetails from "./Pages/ProductDetails/ProductDetails.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Sh08D9pgs26zdmNonryxOFv2AWLfki7uKAmaEKCvoxx8FS4SiSed5C4mmraNpIBq3iDOZuTYs6GSjL2ZSuqMZrP00SV1S4g7T"
);

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/cart" element={<Cart />} />

      {/* Category results */}
      <Route path="/results/:categoryName" element={<Results />} />

      {/* Product details */}
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  );
};

export default Routing;
