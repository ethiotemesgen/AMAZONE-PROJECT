// Results.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Results.module.css";

const Results = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `https://fakestoreapi.com/products/category/${encodeURIComponent(
            categoryName
          )}`
        );
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryName]);

  if (loading) return <h2>Loading...</h2>;
  if (!products.length) return <h2>No products found</h2>;

  return (
    <div className={styles.resultsContainer}>
      <h2>Results for: {categoryName}</h2>
      <div className={styles.productGrid}>
        {products.map((p) => (
          <div key={p.id} className={styles.productCard}>
            <img src={p.image} alt={p.title} className={styles.productImage} />
            <h3>{p.title}</h3>
            <p>${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
