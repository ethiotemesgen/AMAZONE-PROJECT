import React, { useContext } from "react";
import { Card, CardMedia, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ProductInfo from "./ProductInfo";
import styles from "./Product.module.css";
import { Type } from "../../Utility/Action.type";
import { DataContext } from "../DataProvider/DataProvider";

const ProductCard = ({ product }) => {
  const [state, dispatch] = useContext(DataContext);

  if (!product) return null; // prevent undefined errors

  // Check if the product is already in the cart
  const isInCart = state.basket.some((item) => item.id === product.id);

  const addToCart = () => {
    dispatch({ type: Type.ADD_TO_BASKET, item: product });
  };

  return (
    <Card className={styles.productCard} elevation={4}>
      <Link to={`/product/${product.id}`} className={styles.imageLink}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          className={styles.productImage}
        />
      </Link>

      <CardContent>
        <ProductInfo product={product} />

        {/* Only show Add to Cart button if not already in cart */}
        {!isInCart && (
          <Button
            variant="contained"
            color="warning"
            fullWidth
            className={styles.addToCart}
            onClick={addToCart}
          >
            Add to Cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
