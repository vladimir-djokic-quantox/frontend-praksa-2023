import { atom, map } from 'nanostores';

export const selectedCategories = atom([]);

export const isLoading = atom(true);

export const isCartOpen = atom(false);

export const totalQuantity = atom(0);
export const totalPrice = atom(0);

export const cartItems = map({});

function addCartItem({ id, name, price, thumbnail }) {
  const existingEntry = cartItems.get()[id];
  if (existingEntry) {
    cartItems.setKey(id, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    });
  } else {
    cartItems.setKey(id, { id, name, price, thumbnail, quantity: 1 });
  }

  updateCartTotal();
}

function deleteCartItem(id) {
  const existingEntry = cartItems.get()[id];

  if (existingEntry) {
    const newCartItems = { ...cartItems.get() };
    delete newCartItems[id];
    cartItems.set(newCartItems);

    updateCartTotal();
  }
}

function increaseCartItem(id) {
  const existingEntry = cartItems.get()[id];

  if (existingEntry) {
    cartItems.setKey(id, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    });

    updateCartTotal();
  }
}

function decreaseCartItem(id) {
  const existingEntry = cartItems.get()[id];

  if (existingEntry && existingEntry.quantity > 1) {
    cartItems.setKey(id, {
      ...existingEntry,
      quantity: existingEntry.quantity - 1,
    });

    updateCartTotal();
  }
}

function updateCartTotal() {
  const items = cartItems.get();
  const quantity = Object.values(items).reduce((total, item) => total + item.quantity, 0);
  const price = Object.values(items).reduce((total, item) => total + item.price * item.quantity, 0);

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
