import React from "react";
import { addCartItem } from "../utils/cartStore";

const Button = ({ data, ...rest }) => {
  return (
    <button
      className="bg-green-500 text-white px-5 py-3 rounded hover:bg-green-600 transition duration-300"
      onClick={() => {
        addCartItem(data);
      }}
      {...rest}
    >
    </button>
  );
};

export default Button;
