import React, { useContext, useEffect, useState } from "react";
import Layout from "../../COMPONENT/Layout/Layout";
import { DataContext } from "../../COMPONENT/DataProvider/DataProvider";
import { Type } from "../../Utility/Action.type";
import ProductCard from "../../COMPONENT/Product/ProductCard";
import styles from "./Cart.module.css";

const Cart = () => {
  const [{ basket }, dispatch] = useContext(DataContext);
  const safeBasket = Array.isArray(basket) ? basket : [];

  /* ---------- Quantity Handlers ---------- */
  const increaseQty = (id) => dispatch({ type: Type.INCREASE_QTY, id });

  const decreaseQty = (id) => dispatch({ type: Type.DECREASE_QTY, id });

  /* ---------- Totals ---------- */
  const totalItems = safeBasket.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = safeBasket
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  /* ---------- Last Updated ---------- */
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    setLastUpdated(new Date());
  }, [safeBasket]);

  return (
    <Layout>
      <section className={styles.cartSection}>
        {/* ================= LEFT ================= */}
        <div className={styles.cartLeft}>
          <h2>Your Shopping Basket</h2>
          <hr />

          {safeBasket.length === 0 ? (
            <p>Oops! No items in your cart.</p>
          ) : (
            safeBasket.map((item) => (
              <div key={item.id} className={styles.cartItemWrapper}>
                <ProductCard product={item} />

                {/* Quantity Controls */}
                <div className={styles.qtyControls}>
                  <button onClick={() => decreaseQty(item.id)}>−</button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ================= RIGHT ================= */}
        <div className={styles.cartRight}>
          <div className={styles.summaryHeader}>
            <h3>
              Subtotal ({totalItems} item
              {totalItems !== 1 ? "s" : ""})
            </h3>
            <span className={styles.lastUpdated}>
              {lastUpdated.toLocaleTimeString()}
            </span>
          </div>

          <p className={styles.subtotalText}>
            <strong>${subtotal}</strong>
          </p>

          {/* Summary Details */}
          {safeBasket.length > 0 && (
            <div className={styles.summaryDetails}>
              <h4>Items in your basket</h4>
              <ul>
                {safeBasket.map((item) => (
                  <li key={item.id}>
                    {item.title} × {item.quantity} = $
                    {(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.giftOption}>
            <input type="checkbox" id="gift" />
            <label htmlFor="gift">This order contains a gift</label>
          </div>

          <button className={styles.checkoutButton}>
            Continue to checkout
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
