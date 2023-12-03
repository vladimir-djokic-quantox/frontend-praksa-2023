import React, { useState, useEffect } from "react";
import OrderModal from "./OrderModal";

const Cart = () => {
  const [cartData, setCartData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOrderNow = () => {
    setModalOpen(true);
  };
  

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(parsedUserInfo);

      fetch(`https://dummyjson.com/carts/user/${parsedUserInfo.id}`)
        .then((res) => res.json())
        .then((data) => setCartData(data.carts[0]));
    }
  }, []);

  useEffect(() => {
    if (cartData) {
      const totalProductsCount = cartData.products.length;
      const totalQuantityCount = cartData.products.reduce(
        (total, product) => total + product.quantity,
        0
      );
      const totalPriceValue = cartData.products.reduce(
        (total, product) => total + product.discountedPrice * product.quantity,
        0
      );

      setTotalProducts(totalProductsCount);
      setTotalQuantity(totalQuantityCount);
      setTotalPrice(totalPriceValue);
    }
  }, [cartData]);

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

  if (!userInfo || !cartData) {
    return <p>Loading...</p>;
  }

  

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-4 rounded shadow ">
        <div>
          <ul>
            {cartData.products.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between border-b pb-4 mb-4"
              >
                <div className="flex items-center justify-between w-full">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-16 h-16 object-cover mr-4 rounded"
                  />
                  <div className="flex items-center w-2/3">
                    <div>
                      <p className="text-lg font-semibold mb-1">
                        {product.title}
                      </p>
                      <p>Price: ${product.discountedPrice}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="mr-4">Quantity: {product.quantity}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDecrement(product.id)}
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleIncrement(product.id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between items-end ">
        <button
          onClick={handleClearCart}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4">
          Clear Cart
        </button>
        <div className="mt-4">
          <p className="text-lg font-semibold mb-2">Cart Summary:</p>
          <p>Total Products: {totalProducts}</p>
          <p>Total Quantity: {totalQuantity}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
        <button
              onClick={handleOrderNow}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4"
            >
              Order Now
            </button>
        </div>
      </div>
      <OrderModal
      isOpen={isModalOpen}
      onClose={() => setModalOpen(false)}
      handleClearCart={handleClearCart}
      totalPrice={totalPrice}
    />
    </div>
  );
};

export default Cart;
