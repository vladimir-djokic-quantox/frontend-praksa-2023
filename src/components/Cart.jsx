// CartPage.js
import React from 'react';
import { useStore } from "@nanostores/react";
import { cartItems, totalQuantity, totalPrice } from "../pages/cartStore";

const Cart = () => {
  const $cartItems = useStore(cartItems);
  const $totalQuantity = useStore(totalQuantity);
  const $totalPrice = useStore(totalPrice);

  return (
    <div>
      <h2>Your Shopping Cart</h2>
      {Object.values($cartItems).map((cartItem) => (
        <div key={cartItem.id}>
          <p>{cartItem.name}</p>
          <p>Quantity: {cartItem.quantity}</p>
          <p>Price: ${parseFloat(cartItem.price).toFixed(2)}</p>
        </div>
      ))}
      <div>
        <p>Total Quantity: {$totalQuantity}</p>
        <p>Total Price: ${$totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Cart;
