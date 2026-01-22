import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../COMPONENT/DataProvider/DataProvider";
import { useNavigate } from "react-router-dom";
import { db } from "../../Utility/Firebase"; 
import Layout from "../../COMPONENT/Layout/Layout";
import styles from "./Orders.module.css";

// ← New imports for Firebase v9 modular Firestore
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

const Orders = () => {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth", {
        state: { msg: "Please log in to view your orders." },
      });
      return;
    }

    let isMounted = true;

    const fetchOrders = async () => {
      try {
        // ← Updated: modular query syntax
        const ordersRef = collection(db, "orders");
        const q = query(
          ordersRef,
          where("userId", "==", user.uid),
          orderBy("created", "desc"),
        );

        const snapshot = await getDocs(q);

        if (isMounted) {
          const fetchedOrders = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(fetchedOrders);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchOrders();

    return () => {
      isMounted = false;
    };
  }, [user, navigate]);

  if (loading) return <p className={styles.loading}>Loading your orders...</p>;

  if (!orders.length)
    return <p className={styles.empty}>You have no past orders.</p>;

  return (
    <Layout>
      <section className={styles.container}>
        <h1>Your Orders</h1>

        {orders.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <span>
                <strong>Order ID:</strong> {order.id}
              </span>
              <span>
                <strong>Total:</strong> ${Number(order.total).toFixed(2)}
              </span>
              <span>
                <strong>Status:</strong> {order.status || "Processing"}
              </span>
              <span>
                <strong>Date:</strong>{" "}
                {new Date(order.created).toLocaleString()}
              </span>
            </div>

            <div className={styles.orderItems}>
              {order.items.map((item) => (
                <div key={item.id} className={styles.orderItem}>
                  <img
                    src={item.image || item.img || ""}
                    alt={item.title || item.name}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemDetails}>
                    <p className={styles.itemTitle}>
                      {item.title || item.name}
                    </p>
                    <p>Quantity: {item.quantity || 1}</p>
                    <p>Price: ${Number(item.price || 0).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </Layout>
  );
};

export default Orders;
