import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Top Back-to-Top Button */}
      <div
        className={styles.backToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top
      </div>

      {/* Main Footer Sections */}
      <div className={styles.footerSections}>
        {/* Section 1 */}
        <div className={styles.section}>
          <h4>Get to Know Us</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press Releases</li>
            <li>Amazon Cares</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className={styles.section}>
          <h4>Connect with Us</h4>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className={styles.section}>
          <h4>Make Money with Us</h4>
          <ul>
            <li>Sell on Amazon</li>
            <li>Affiliate Program</li>
            <li>Advertise Your Products</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className={styles.section}>
          <h4>Let Us Help You</h4>
          <ul>
            <li>Your Account</li>
            <li>Returns Centre</li>
            <li>100% Purchase Protection</li>
            <li>Help</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        &copy; 2025 My Amazon Clone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
