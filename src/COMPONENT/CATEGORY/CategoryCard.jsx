// src/COMPONENT/CATEGORY/CategoryCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./category.module.css";

const CategoryCard = ({ data }) => {
  return (
    <div className={styles.categoryCard}>
      <Link to={`/results/${data.name}`} className={styles.categoryCardLink}>
        <h3 className={styles.categoryTitle}>{data.title}</h3>
        <img
          src={data.image}
          alt={data.title}
          className={styles.categoryImage}
        />
        <span className={styles.categoryLink}>Shop {data.title}</span>
      </Link>
    </div>
  );
};

export default CategoryCard;
