import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { FiMapPin, FiSearch, FiShoppingCart } from "react-icons/fi";
import { DataContext } from "../DataProvider/DataProvider";

export default function Header() {
  const [state] = useContext(DataContext); // useContext correctly
  const { basket } = state;

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Left: Logo + Delivery */}
        <div className={styles.headerLeft}>
          {/* Logo */}
          <Link to="/" className={styles.headerLogo}>
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon Logo"
            />
          </Link>

          {/* Delivery */}
          <div className={styles.headerDelivery}>
            <span className={styles.locationIcon}>
              <FiMapPin size={20} color="white" />
            </span>
            <div className={styles.deliveryText}>
              <p>Deliver to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>

        {/* Center: Search */}
        <div className={styles.headerSearch}>
          <select>
            <option value="all">All</option>
          </select>
          <input type="text" placeholder="Search product" />
          <button className={styles.searchBtn} type="button">
            <FiSearch size={20} />
          </button>
        </div>

        {/* Right side */}
        <div className={styles.headerRight}>
          {/* Language */}
          <div className={styles.headerLanguage}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/71/Flag_of_Ethiopia.svg"
              alt="Ethiopia flag"
            />
            <select>
              <option>EN</option>
            </select>
          </div>

          {/* Account */}
          <div className={styles.headerAccount}>
            <Link to="/signin">
              <p>Sign In</p>
            </Link>
            <span>Account & Lists</span>
          </div>

          {/* Orders */}
          <Link to="/orders" className={styles.headerOrders}>
            <p>Returns</p>
            <span>& Orders</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className={styles.headerCart}>
            <FiShoppingCart size={25} color="white" />
            <span className={styles.cartCount}>{basket.length}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
