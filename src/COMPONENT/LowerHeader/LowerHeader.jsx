import React from "react";
import styles from "./LowerHeader.module.css";
import { FiMenu } from "react-icons/fi";

const LowerHeader = () => {
  return (
    <div className={styles.lowerHeader}>
      <div className={styles.lowerHeaderContainer}>
        {/* Left: Hamburger Menu */}
        <div className={styles.menu}>
          <FiMenu size={20} />
          <span>All</span>
        </div>

        {/* Navigation Links */}
        <nav className={styles.navLinks}>
          <a href="/">Today's Deals</a>
          <a href="/">Customer Service</a>
          <a href="/">Gift Cards</a>
          <a href="/">Registry</a>
          <a href="/">Sell</a>
          <a href="/">Prime</a>
          <a href="/">New Releases</a>
        </nav>
      </div>
    </div>
  );
};

export default LowerHeader;
