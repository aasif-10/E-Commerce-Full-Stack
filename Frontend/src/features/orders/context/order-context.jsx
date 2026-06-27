import { createContext, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [order, setOrder] = useState(null)

  return (
    <OrderContext.Provider value={{ orders, setOrders, fetching, setFetching, order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
