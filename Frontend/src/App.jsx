import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.jsx";
import { AuthProvider } from "./features/auth/context/auth-context.jsx";
import { ProductProvider } from "./features/products/context/product-context.jsx";
import { CartProvider } from "./features/cart/context/cart-context.jsx";

const App = () => {
  return (
    <>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </>
  );
};

export default App;
