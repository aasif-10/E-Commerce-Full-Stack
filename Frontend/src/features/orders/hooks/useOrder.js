import { useContext } from "react";
import { OrderContext } from "../../orders/context/order-context";
import {
  getOrdersByUserId,
  createOrder,
  cancelOrder,
  getOrderById
} from "../../orders/services/order-api";

export const useOrder = () => {
  const context = useContext(OrderContext);
  const { orders, setOrders, fetching, setFetching, order, setOrder } = context;

  const handleGetOrderByUser = async () => {
    try {
      setFetching(true);
      const response = await getOrdersByUserId();
      setOrders(response.orders);
    } catch (error) {
      throw error;
    } finally {
      setFetching(false);
    }
  };

  const handleCreateOrder = async (products, totalPrice) => {
    try {
      setFetching(true);

      const address = "123 Default Street, City";
      const paymentId = "PAY_" + Math.random().toString(36).substr(2, 9).toUpperCase();
      const status = "pending";

      const response = await createOrder(
        products,
        totalPrice,
        paymentId,
        address,
        status,
      );
      if (orders) {
        setOrders([...orders, response.order]);
      }
    } catch (error) {
      throw error;
    } finally {
      setFetching(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      setFetching(true);
      await cancelOrder(orderId);
      await handleGetOrderByUser();
    } catch (error) {
      throw error;
    } finally {
      setFetching(false);
    }
  }

  const handleGetOrderById = async (orderId) => {
    try {
      setFetching(true);
      const response = await getOrderById(orderId);
      setOrder(response.order);
    } catch (error) {
      throw error;
    } finally {
      setFetching(false);
    }
  }

  return {
    orders,
    fetching,
    order,
    handleGetOrderByUser,
    handleCreateOrder,
    handleCancelOrder,
    handleGetOrderById
  };
};
