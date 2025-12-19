import React from "react";
import { Carousel } from "react-responsive-carousel";
import styles from "./Carousel.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { img } from "./data";
import Category from "../CATEGORY/Category";

const CarouselComponent = () => {
  return (
    <div className={styles.carouselWrapper}>
      <Carousel
        autoPlay
        infiniteLoop
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        interval={3000}
        swipeable
        emulateTouch
      >
        {img.map((ImgItemLink, index) => (
          <div key={index} className={styles.carouselItem}>
            <img src={ImgItemLink} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Carousel>

      {/* Categories overlapping bottom half of carousel */}
      <Category />
    </div>
  );
};

export default CarouselComponent;
