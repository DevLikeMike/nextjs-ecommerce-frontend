import { createContext, useState } from "react";
import { NEXT_URL } from "@/config/index";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(null);
  const [orders, setOrders] = useState(null);

  const getUserOrders = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/userOrders`, {
      headers: { id: `${user.id}` },
    });
    const data = await res.json();

    if (res.ok) {
      setOrders(data);
    } else {
      setOrders(null);
    }
  };

  const getOrder = async (orderId) => {
    const res = await fetch(`${NEXT_URL}/api/getOrder`, {
      method: "POST",
      body: JSON.stringify({ id: orderId }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (res.ok) {
      setOrder(data.order);
    } else {
      setOrder(null);
    }
  };

  return (
    <OrderContext.Provider value={{ order, orders, getUserOrders, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
