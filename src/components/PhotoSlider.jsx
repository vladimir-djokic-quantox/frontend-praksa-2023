import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

function PhotoSlider() {
  const slides = [
    {
      url: "src/images/image1.jpg",
    },
    {
      url: "src/images/image2.jpg",
    },
    {
      url: "src/images/image3.jpg",
    },

    {
      url: "src/images/image4.jpg",
    },
    {
      url: "src/images/image5.jpg",
    },
    {
      url: "src/images/image6.jpg",
    },
    {
      url: "src/images/image7.jpg",
    },
    {
      url: "src/images/image8.jpg",
    },

    {
      url: "src/images/image9.jpg",
    },
    {
      url: "src/images/image10.jpg",
    },
    {
      url: "src/images/image11.jpg",
    },
    {
      url: "src/images/image12.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const autoPlay = () => {
    nextSlide();
  };

  useEffect(() => {
    const interval = setInterval(autoPlay, 5000); 

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);
  

  return (
    <div className="max-w-[1400px] h-[500px] w-[60%] m-auto py-4 px-4 relative group mb-[30px]">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      ></div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2 ">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoSlider;
