import React from "react";

const ProductItem = ({ product, onAddToCart, formatPrice }) => {
  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <li className="bg-white p-4 rounded-lg shadow-md w-[300px] transition duration-300 transform hover:scale-105">
      <a href={`/${product.id}`} key={product.id}>
        <img
          src={product.thumbnail}
          className="w-full h-40 object-cover rounded-md hover:opacity-90"
          alt={product.title}
        />
      </a>

      <div className="flex flex-col justify-between ">
        <h4 className="text-xl font-semibold mt-2 line-clamp-1">
          {product.title}
        </h4>
        <div className="flex items-center mt-1 text-gray-700">
          <span className="text-orange font-medium">Brand:</span>
          <span className="ml-1">{product?.brand}</span>
        </div>
        <div className="flex items-center mt-1 text-gray-700">
          <span className="text-orange font-medium">Category:</span>
          <span className="ml-1 text-capitalize">
            {product?.category ? product.category.replace("-", " ") : ""}
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="text-gray-700 line-through text-sm">
            {formatPrice(product.price)}
          </div>
          <div className="text-dark ml-2 text-lg font-semibold">
            {formatPrice(discountedPrice)}
          </div>
        </div>
        <button
          className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 focus:outline-none "
          onClick={() =>
            onAddToCart(
              product.id,
              product.title,
              discountedPrice,
              product.thumbnail
            )
          }
        >
          Add to Cart
        </button>
      </div>
    </li>
  );
};

export default ProductItem;
