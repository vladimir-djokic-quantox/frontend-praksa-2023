import { useStore } from "@nanostores/react";
import {
  totalQuantity,
  totalPrice,
  isCartOpen,
  cartItems,
  deleteCartItem,
  increaseCartItem,
  decreaseCartItem,
} from "../utils/cartStore";
import { useEffect, useRef } from "react";

const CartButton = ({}) => {
  const isCartOpenValue = useStore(isCartOpen);
  const totalQuantityValue = useStore(totalQuantity);
  const totalPriceValue = useStore(totalPrice);
  const cartItemsValue = useStore(cartItems);
  const cartPopupRef = useRef(null);
  const cartButtonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      cartPopupRef.current &&
      !cartPopupRef.current.contains(event.target) &&
      cartButtonRef.current !== event.target
    ) {
      isCartOpen.set(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-center border-b-1 border-solid border-gray-300">
      <div className="container flex items-center justify-between relative">
        <div className="cart text-base font-normal">
          <button
            ref={cartButtonRef}
            onClick={() => isCartOpen.set(!isCartOpenValue)}
            className="cursor-pointer"
          >
            Cart({totalQuantityValue})
          </button>
        </div>
        <div
          ref={cartPopupRef}
          hidden={!isCartOpenValue}
          className="cart-popup absolute bg-green-500 top-0 right-20 p-4 w-[300px] shadow-md border border-solid border-gray-100"
        >
          {cartItemsValue.length ? (
            <>
              {cartItemsValue.map((cartItem) => (
                <div key={cartItem.id} className="popup-item flex mb-2">
                  <img
                    src={cartItem.thumbnail}
                    alt={cartItem.name}
                    className="w-14 h-14 object-contain mr-2"
                  />
                  <div className="detail-item w-full flex flex-col justify-between overflow-hidden">
                    <p className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {cartItem.name}
                    </p>
                    <div className="btn-group flex items-center max-w-100 w-full">
                      <button
                        onClick={() => decreaseCartItem(cartItem.id)}
                        className="p-2 border-0 bg-green-500 cursor-pointer text-base font-bold m-0"
                      >
                        -
                      </button>
                      <p className="m-2">{cartItem.quantity}</p>
                      <button
                        onClick={() => increaseCartItem(cartItem.id)}
                        className="p-2 border-0 bg-green-500 cursor-pointer text-base font-bold m-0"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="option-item flex flex-col justify-between pb-1">
                    <button
                      onClick={() => deleteCartItem(cartItem.id)}
                      className="cursor-pointer border-0 bg-green-500 text-red-500 text-base font-medium"
                    >
                      Delete
                    </button>
                    <p className="text-base font-medium">
                      ${parseFloat(cartItem.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              <hr className="my-2" />
              <div className="total flex justify-between text-base font-semibold pt-2 pb-1">
                <p>Total</p>
                <p>${totalPriceValue.toFixed(2)}</p>
              </div>
              <a
                href="/cart"
                className="cursor-pointer text-base font-normal bg-green-500 text-white px-3 py-2 rounded transition duration-300 hover:bg-green-600"
              >
                View My Shopping Cart
              </a>
            </>
          ) : (
            <p>Your cart is empty!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartButton;
