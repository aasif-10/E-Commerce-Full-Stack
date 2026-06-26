import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const getProducts = async () => {
  try {
    const response = await api.get("/api/products");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addToCart = async (productId, quantity) => {
  try {
    const response = await api.post("/api/cart", { productId, quantity });
    return response.data;
  } catch (error) {
    throw error;
  }
};
