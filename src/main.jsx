import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { DataProvider } from "./COMPONENT/DataProvider/DataProvider";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Replace with your Stripe publishable key
const stripePromise = loadStripe("pk_test_YOUR_STRIPE_PUBLISHABLE_KEY");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataProvider>
      <HashRouter>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </HashRouter>
    </DataProvider>
  </React.StrictMode>
);
