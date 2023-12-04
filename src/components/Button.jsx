import React from "react";
import { addCartItem } from "../utils/cartStore";

const Button = ({ children, data }) => {
  return (
    <button
      className="bg-green-500 text-white px-5 py-3 rounded hover:bg-green-600 transition duration-300"
      onClick={() => {
        addCartItem(data);
      }}
    >
      {children}
    </button>
  );
};

export default Button;
