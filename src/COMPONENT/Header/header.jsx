import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { FiMapPin, FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/Firebase";

export default function Header() {
  const [state, dispatch] = useContext(DataContext);
  const { basket, user } = state;
  const navigate = useNavigate();
  const [accountDropdown, setAccountDropdown] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      dispatch({ type: "SET_USER", payload: currentUser });
    });
    return () => unsubscribe();
  }, [dispatch]);

  const handleSignOut = async () => {
    await auth.signOut();
    dispatch({ type: "SET_USER", payload: null });
    setAccountDropdown(false);
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* LEFT: Logo & Delivery */}
        <div className={styles.headerLeft}>
          <Link to="/" className={styles.headerLogo}>
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon Logo"
            />
          </Link>
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

        {/* CENTER: Search */}
        <div className={styles.headerSearch}>
          <select>
            <option value="all">All</option>
          </select>
          <input type="text" placeholder="Search product" />
          <button className={styles.searchBtn} type="button">
            <FiSearch size={20} />
          </button>
        </div>

        {/* RIGHT: Language, Account, Orders, Cart */}
        <div className={styles.headerRight}>
          {/* Language with Ethiopian flag */}
          {/* Language with Ethiopian flag */}
          <div className={styles.headerLanguage}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_Ethiopia.svg/64px-Flag_of_Ethiopia.svg.png"
              alt="Ethiopian Flag"
            />
            <select>
              <option value="en">EN</option>
              <option value="am">AM</option>
            </select>
          </div>

          {/* Account */}
          <div
            className={styles.headerAccount}
            onMouseEnter={() => setAccountDropdown(true)}
            onMouseLeave={() => setAccountDropdown(false)}
          >
            <Link
              to={!user ? "/auth" : "#"}
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              {user && <FiUser size={20} color="white" />}
              <p>Hello, {user ? user.displayName || user.email : "Sign In"}</p>
            </Link>
            <span>Account & Lists</span>

            {accountDropdown && user && (
              <div className={styles.dropdownMenu}>
                <Link to="/profile">Profile</Link>
                <Link to="/orders">Orders</Link>
                <button onClick={handleSignOut}>Sign Out</button>
              </div>
            )}
          </div>

          {/* Orders */}
          <Link to="/orders" className={styles.headerOrders}>
            <p>Returns</p>
            <span>& Orders</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className={styles.headerCart}>
            <FiShoppingCart size={25} color="white" />
            <span className={styles.cartCount}>
              {Array.isArray(basket) ? basket.length : 0}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
