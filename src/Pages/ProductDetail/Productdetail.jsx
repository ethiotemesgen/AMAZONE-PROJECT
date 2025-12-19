import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../COMPONENT/Layout/Layout";
import styles from "./Productdetail.module.css";
import { Button, Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Loader = ({ color = "#FFA41C", size = 15, loading = true }) => {
  const loaderStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(255, 255, 255, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  };

  return (
    <div style={loaderStyle}>
      <ClimbingBoxLoader color={color} size={size} loading={loading} />
    </div>
  );
};

const Productdetail = () => {
  const { id } = useParams(); // product id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);

        setProduct({
          ...res.data,
          rating: Math.round(res.data.rating?.rate || 4),
        });
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Loader />; // show spinner while loading

  if (!product)
    return (
      <Layout>
        <h2>Product not found</h2>
      </Layout>
    );

  return (
    <Layout>
      <div className={styles.detailWrapper}>
        {/* Image */}
        <div className={styles.imageSection}>
          <img
            src={product.image}
            alt={product.title}
            className={styles.productImage}
          />
        </div>

        {/* Info */}
        <div className={styles.infoSection}>
          <Typography variant="h5" gutterBottom>
            {product.title}
          </Typography>

          {/* Rating */}
          <Box className={styles.rating}>
            {Array.from({ length: product.rating }).map((_, i) => (
              <StarIcon key={i} sx={{ color: "#FFA41C" }} />
            ))}
          </Box>

          <Typography variant="h6" color="error">
            ${product.price}
          </Typography>

          <Typography className={styles.description}>
            {product.description}
          </Typography>

          <Button variant="contained" color="warning">
            Add to Cart
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Productdetail;
