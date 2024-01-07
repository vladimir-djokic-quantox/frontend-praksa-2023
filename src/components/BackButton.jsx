import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

const BackToHomeButton = () => {
  return (
    <a
      href="/"
      className="text-green-500 hover:text-green-700 flex items-center p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out"
    >
      <FaArrowLeftLong className="mr-2" />
      Back to Home
    </a>
  );
};

export default BackToHomeButton;
