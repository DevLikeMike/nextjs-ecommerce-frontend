import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initial State
  const [shippingAddress, setShippingAddress] = useState({});
  let cartItemsFromStorage;

  // Check for Items in localstorage
  // Set initial state to items in local storage or an empty array
  if (typeof window !== "undefined") {
    cartItemsFromStorage = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
  }
  // Set cartItems via localstorage or empty array intially
  const [cartItems, setCartItems] = useState(cartItemsFromStorage);

  // Add item to cart
  const addCartItem = (item) => {
    // check to see if the item is already in cart and is same size
    const itemExists = cartItems.find(
      (cartItem) => cartItem.id === item.id && cartItem.size === item.size
    );

    // If item does exists, then add the quantities together.
    if (itemExists) {
      setCartItems(
        cartItems.map((cartItem) => {
          if (
            cartItem.id === itemExists.id &&
            cartItem.size === itemExists.size
          ) {
            itemExists.quantity = cartItem.quantity + 1;
            return itemExists;
          } else {
            return cartItem;
          }
        })
      );
    } else {
      // If item does not exist then just add it to cart
      // Every time an item is added to cart, save it to local storage
      setCartItems([...cartItems, item]);
    }
  };

  // Set local storage cartItems
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [addCartItem]);

  const router = useRouter();

  // Delete item from cart
  const deleteCartItem = (item) => {
    let filterdItems = cartItems.filter((cartItem) => {
      // Make sure items match by size and id
      if (cartItem.id === item.id && cartItem.size === item.size) {
        return;
      } else {
        return cartItem;
      }
    });
    setCartItems(filterdItems);
  };

  const saveShippingAddress = (shipAddress) => {
    setShippingAddress(shipAddress);

    localStorage.setItem("shippingAddress", JSON.stringify(shipAddress));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addCartItem, deleteCartItem, shippingAddress }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
