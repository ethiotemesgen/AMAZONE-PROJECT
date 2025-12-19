import React from "react";
import Layout from "../../COMPONENT/Layout/Layout";
import CarouselComponent from "../../COMPONENT/CAROUSEL/Carousel";

import Product from "../../COMPONENT/Product/Product";

const Landing = () => {
  return (
    <Layout>
      <CarouselComponent />
      
      <Product />
    </Layout>
  );
};

export default Landing;
