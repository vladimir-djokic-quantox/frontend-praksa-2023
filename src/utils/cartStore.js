import { atom } from 'nanostores';

export const selectedCategories = atom([]);
export const isLoading = atom(true);
export const isCartOpen = atom(false);
export const totalQuantity = atom(0);
export const totalPrice = atom(0);

export const cartItems = atom([]);

function addCartItem({ id, name, price, thumbnail }) {
  const existingEntryIndex = cartItems.get().findIndex((item) => item.id === id);

  if (existingEntryIndex !== -1) {
    const updatedCartItems = [...cartItems.get()];
    updatedCartItems[existingEntryIndex].quantity += 1;
    cartItems.set(updatedCartItems);
  } else {
    cartItems.set([...cartItems.get(), { id, name, price, thumbnail, quantity: 1 }]);
  }

  updateCartTotal();
}

function deleteCartItem(id) {
  const updatedCartItems = cartItems.get().filter((item) => item.id !== id);
  cartItems.set(updatedCartItems);

  updateCartTotal();
}

function increaseCartItem(id) {
  const existingEntryIndex = cartItems.get().findIndex((item) => item.id === id);

  if (existingEntryIndex !== -1) {
    const updatedCartItems = [...cartItems.get()];
    updatedCartItems[existingEntryIndex].quantity += 1;
    cartItems.set(updatedCartItems);

    updateCartTotal();
  }
}

function decreaseCartItem(id) {
  const existingEntryIndex = cartItems.get().findIndex((item) => item.id === id);

  if (existingEntryIndex !== -1 && cartItems.get()[existingEntryIndex].quantity > 1) {
    const updatedCartItems = [...cartItems.get()];
    updatedCartItems[existingEntryIndex].quantity -= 1;
    cartItems.set(updatedCartItems);

    updateCartTotal();
  }
}

function updateCartTotal() {
  const items = cartItems.get();
  const quantity = items.reduce((total, item) => total + item.quantity, 0);
  const price = items.reduce((total, item) => total + item.price * item.quantity, 0);

  totalQuantity.set(quantity);
  totalPrice.set(price);
}

export {
  addCartItem,
  deleteCartItem,
  increaseCartItem,
  decreaseCartItem,
  updateCartTotal,
};
