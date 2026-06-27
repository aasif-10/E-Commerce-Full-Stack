import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const getOrdersByUserId = async () => {
  try {
    const response = await api.get("/api/orders");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (
  products,
  totalPrice,
  paymentId,
  address,
  status,
) => {
  try {
    const response = await api.post("/api/orders", {
      products,
      totalPrice,
      paymentId,
      address,
      status,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelOrder = async (orderId) => {
  try {
    const response = await api.delete(`/api/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`/api/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}