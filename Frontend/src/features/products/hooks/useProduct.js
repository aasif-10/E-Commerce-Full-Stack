import { useContext } from "react";
import { ProductContext } from "../context/product-context";
import {
  getProductById,
  getProducts,
  addToCart,
} from "../services/product-api";

export const useProduct = () => {
  const context = useContext(ProductContext);
  const { products, setProducts, product, setProduct, error, setError } =
    context;

  const handleGetProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.products);
    } catch (error) {
      setError(error);
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  const handleGetProductById = async (id) => {
    try {
      const response = await getProductById(id);
      setProduct(response.product);
    } catch (error) {
      setError(error);
      console.error("Error fetching product:", error);
      throw error;
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    try {
      const response = await addToCart(productId, quantity);
    } catch (err) {
      setError(err.response.data.message);
      console.error("Error adding to cart:", err);
      throw err;
    }
  };

  return {
    product,
    setProduct,
    products,
    setProducts,
    handleGetProducts,
    handleGetProductById,
    handleAddToCart,
    error,
    setError,
  };
};
