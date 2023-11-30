import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className="max-w-xl mx-auto mt-8 ">
      {images.map((image, index) => (
        <div key={index} className="rounded-md ">
          <img
            src={image}
            alt={`Image ${index + 1}`}
            className="w-full h-auto max-h-300 object-cover mx-auto"
            style={{ maxWidth: '350px', maxHeight: '350px' }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
