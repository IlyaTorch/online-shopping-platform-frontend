import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import './itemSlider.scss';


const ImageSlider = ({images}) => (
  <Carousel width='400px' className="image-slider">
      {
          images.map((image, index) =>
            <div key={index}>
              <img alt="" src={image} />
            </div>
          )
      }
  </Carousel>
);


export default ImageSlider;
