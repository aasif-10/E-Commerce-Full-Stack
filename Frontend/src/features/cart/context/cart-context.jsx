import { useState } from "react";
import { createContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(null);
  const [error, setError] = useState(null);
  return (
    <CartContext.Provider value={{ cartItems, setCartItems, error, setError }}>
      {children}
    </CartContext.Provider>
  );
};
