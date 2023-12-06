import React, { useState, useEffect, useMemo } from "react";
import OrderModal from "./OrderModal";
import ProductCard from "./ProductCard";
import { formatPrice } from "../utils/formatPrice";
import { cartApiUrl } from "../utils/apiConstants";

const ShopingCart = () => {
  const [cartData, setCartData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOrderNow = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        const parsedUserInfo = JSON.parse(storedUserInfo);

        try {
          const response = await fetch(cartApiUrl(parsedUserInfo.id)); 
          const data = await response.json();
          setCartData(data.carts[0]);
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      }
    };

    fetchData();
  }, []);

  const handleIncrement = (productId) => {
    const updatedCart = {
      ...cartData,
      products: cartData.products.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      ),
    };
    setCartData(updatedCart);
  };

  const handleDecrement = (productId) => {
    const updatedCart = {
      ...cartData,
      products: cartData.products.map((product) =>
        product.id === productId && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      ),
    };
    setCartData(updatedCart);
  };

  const handleClearCart = () => {
    const clearedCart = {
      ...cartData,
      products: [],
    };
    setCartData(clearedCart);
  };

  const handleDelete = (productId) => {
    const updatedCart = {
      ...cartData,
      products: cartData.products.filter((product) => product.id !== productId),
    };
    setCartData(updatedCart);
  };

  const memoizedCartData = useMemo(() => {
    return {
      totalProducts: cartData?.products.length || 0,
      totalQuantity: cartData?.products.reduce((total, product) => total + product.quantity, 0) || 0,
      totalPrice: cartData?.products.reduce(
        (total, product) => total + product.discountedPrice * product.quantity,
        0
      ) || 0,
    };
  }, [cartData]);

  if (!cartData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-4 rounded shadow">
      <ul className="flex">
          {cartData.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              formatPrice={formatPrice} 
              inCart={true} 
              onIncrement={() => handleIncrement(product.id)}
              onDecrement={() => handleDecrement(product.id)}
              onDelete={() => handleDelete(product.id)}
            />
          ))}
        </ul>
        <div className="flex justify-between items-end mt-4">
          <button
            onClick={handleClearCart}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Clear Cart
          </button>
          <div className="mt-4">
            <p className="text-lg font-semibold mb-2">Cart Summary:</p>
            <p>Total Products: {memoizedCartData.totalProducts}</p>
            <p>Total Quantity: {memoizedCartData.totalQuantity}</p>
            <p>Total Price: ${memoizedCartData.totalPrice.toFixed(2)}</p>
          </div>
          <button
            onClick={handleOrderNow}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Order Now
          </button>
        </div>
      </div>
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        handleClearCart={handleClearCart}
        totalPrice={memoizedCartData.totalPrice}
      />
    </div>
  );
};

export default ShopingCart;
