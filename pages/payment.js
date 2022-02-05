// React and Next imports
import { useContext, useEffect, useState } from "react";

import Layout from "@/components/Layout";
import TrackerContainer from "@/components/TrackerContainer";
import CheckoutTracker from "@/components/CheckoutTracker";
import AuthContext from "@/context/AuthContext";
import CartContext from "@/context/CartContext";
import PayBTN from "@/components/PayBTN";
import CartItem from "@/components/CartItem";

export default function Payment() {
  const [totalPrice, setTotalPrice] = useState(0);

  const { user } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const addPrices = (total, item) => {
    return total + item.price * item.quantity;
  };

  useEffect(() => {
    if (cartItems === undefined) {
      setLoading(true);
    } else {
      setTotalPrice(cartItems.reduce(addPrices, 0));
      setLoading(false);
    }
  }, [cartItems]);

  return (
    <Layout>
      <main className='mt-3 payment'>
        <h1 className='text-center mt-3'>Payment Screen</h1>
        <TrackerContainer>
          <CheckoutTracker href='/shipping'>Shipping</CheckoutTracker>
          <CheckoutTracker href='/payment'>Payment</CheckoutTracker>
          <CheckoutTracker href='/confirm'>Confirm Order</CheckoutTracker>
        </TrackerContainer>
        <div className='info-container flex jc-sb'>
          <div className='cartSide'>
            {!loading && cartItems !== undefined ? (
              cartItems.map((item) => (
                <CartItem
                  item={item}
                  key={`${item.id} ${item.size}`}
                ></CartItem>
              ))
            ) : (
              <h2>Loading</h2>
            )}
            <p className='total'>{totalPrice}</p>
            <PayBTN itemsFromCart={cartItems} />
          </div>
        </div>
      </main>
    </Layout>
  );
}
