import React from "react";
import { Typography, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import styles from "./Product.module.css";

const ProductInfo = ({ product }) => {
  const formatCurrency = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  return (
    <>
      <Typography variant="subtitle1" className={styles.productTitle}>
        {product.title.length > 50
          ? product.title.slice(0, 50) + "..."
          : product.title}
      </Typography>

      <Box className={styles.rating}>
        {Array.from({ length: product.rating }).map((_, i) => (
          <StarIcon key={i} sx={{ color: "#FFA41C", fontSize: 18 }} />
        ))}
      </Box>

      <Typography variant="h6" color="error">
        {formatCurrency(product.price)}
      </Typography>
    </>
  );
};

export default ProductInfo;
