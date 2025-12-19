// Category.jsx
import React from "react";
import styles from "./category.module.css";
import CategoryCard from "./CategoryCard";
import { categoryInfo } from "./CategoryInfo";

const Category = () => {
  return (
    <div className={styles.categoryWrapper}>
      <div className={styles.categoryContainer}>
        {categoryInfo.map((item) => (
          <CategoryCard key={item.name} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Category;
