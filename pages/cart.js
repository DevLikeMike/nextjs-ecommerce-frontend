import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import CartContext from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import Layout from "@/components/Layout";
import Link from "next/link";

export default function CartPage() {
  const [loading, setLoading] = useState(true);
  const { deleteCartItem, cartItems } = useContext(CartContext);

  const router = useRouter();

  useEffect(() => {
    if (cartItems === undefined) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [cartItems]);

  // Handlers
  const placeOrder = (e) => {
    e.preventDefault();
    router.push("/shipping");
  };

  return (
    <Layout>
      <main className='mt-3 cart'>
        <h1 className='text-center'>Cart Items</h1>
        <div className=''>
          {cartItems == [] && (
            <>
              <h1>You have no cart items.</h1>
              <Link href='/'>
                <a className='link-blue'>Back to homepage</a>
              </Link>
            </>
          )}
          {!loading ? (
            <>
              {cartItems.map((item) => (
                <CartItem
                  item={item}
                  key={`${item.id} ${item.size}`}
                  deleteCartItem={deleteCartItem}
                ></CartItem>
              ))}

              <button className='order-btn' onClick={placeOrder}>
                Place Order
              </button>
            </>
          ) : (
            <h1 className='text-center'>Loading</h1>
          )}
        </div>
      </main>
    </Layout>
  );
}
