import React, { useContext, useState, useEffect } from "react";
import Layout from "../../COMPONENT/Layout/Layout";
import { DataContext } from "../../COMPONENT/DataProvider/DataProvider";
import ProductCard from "../../COMPONENT/Product/ProductCard";
import styles from "./payment.module.css";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { db } from "../../Utility/Firebase";
import { collection, addDoc } from "firebase/firestore";
import { Type } from "../../Utility/Action.type";

const Payment = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const safeBasket = Array.isArray(basket) ? basket : [];

  const totalPrice = safeBasket
    .reduce(
      (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
      0,
    )
    .toFixed(2);

  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user, navigate]);

  if (!user) return null;

  useEffect(() => {
    let isMounted = true;

    const getClientSecret = async () => {
      if (safeBasket.length === 0) return;

      try {
        // ── Updated: Use environment variable for backend URL ────────────────
        const backendUrl =
          import.meta.env.VITE_BACKEND_URL //"http://localhost:5000";

        const response = await axios.post(
          `${backendUrl}/payments/create?total=${Math.round(totalPrice * 100)}`,
        );

        if (isMounted && response.data?.clientSecret) {
          setClientSecret(response.data.clientSecret);
        }
      } catch (err) {
        console.error("Failed to get client secret:", err);
        setError("Could not initialize payment.");
      }
    };

    getClientSecret();
    return () => {
      isMounted = false;
    };
  }, [safeBasket, totalPrice, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret || !user) return;

    setProcessing(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: { email: user.email },
          },
        });

      if (stripeError) {
        setError(stripeError.message || "Payment failed.");
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        // Timeout wrapper to prevent hang
        const withTimeout = (promise, ms) =>
          Promise.race([
            promise,
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Firestore timeout")), ms),
            ),
          ]);

        await withTimeout(
          addDoc(collection(db, "orders"), {
            userId: user.uid,
            created: new Date().toISOString(),
            total: Number(totalPrice),
            items: safeBasket,
            status: "Processing",
          }),
          6000, // 6 seconds – adjust if needed
        );

        dispatch({ type: Type.CLEAR_BASKET });

        // Delay navigation to let Firestore settle
        await new Promise((resolve) => setTimeout(resolve, 1200));

        navigate("/orders", { replace: true });
      }
    } catch (err) {
      console.error("Payment / Firestore error:", err);
      setError("Error: " + (err.message || "Unexpected issue"));
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Layout>
      <div className={styles.paymentHeader}>
        <h1>
          Checkout ({safeBasket.length} item{safeBasket.length !== 1 ? "s" : ""}
          )
        </h1>
      </div>

      <section className={styles.paymentSection}>
        <div className={styles.paymentBlock}>
          <h3>Review items and delivery</h3>
          {safeBasket.map((item) => (
            <div key={item.id} className={styles.reviewItem}>
              <ProductCard product={item} />
              <p>Quantity: {item.quantity || 1}</p>
            </div>
          ))}
        </div>

        <div className={styles.paymentBlock}>
          <h3>Payment Method</h3>
          <form onSubmit={handleSubmit}>
            <div className={styles.cardSection}>
              <CardElement />
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.orderSummary}>
              <p>
                <strong>Order Total:</strong> ${totalPrice}
              </p>
              <button
                type="submit"
                className={styles.payButton}
                disabled={processing || !stripe || !clientSecret}
              >
                {processing ? "Processing..." : `Pay $${totalPrice}`}
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Payment;
