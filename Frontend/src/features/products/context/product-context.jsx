import { Children, createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  return (
    <ProductContext.Provider
      value={{ products, setProducts, product, setProduct, error, setError }}
    >
      {children}
    </ProductContext.Provider>
  );
};
