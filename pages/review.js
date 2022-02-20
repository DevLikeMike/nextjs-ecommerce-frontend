import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import CartContext from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import Link from "next/link";

export default function Review() {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { cartItems } = useContext(CartContext);

  const router = useRouter();

  const addPrices = (total, item) => {
    return total + item.price * item.quantity;
  };

  // Load in all cart items
  useEffect(() => {
    if (cartItems === undefined) {
      setLoading(true);
    } else {
      setTotal(cartItems.reduce(addPrices, 0));
      setLoading(false);
    }
  }, [cartItems]);

  // Handlers
  const placeOrder = (e) => {
    e.preventDefault();
    router.push("/shipping");
  };

  return (
    <>
      <div className='cartHeader flex jc-sb ai-c'>
        {!loading ? (
          <>
            <h1 className='text-center'>
              Ready to pay for {cartItems.length}{" "}
              {cartItems.length === 1 ? "item" : "items"} items?
            </h1>
            <Link href='/shirts'>
              <a>Keep Shopping?</a>
            </Link>
          </>
        ) : (
          <h1 className='text-center'>Loading</h1>
        )}
      </div>

      <div className='cartWrapper flex jc-sb'>
        <div className='cartItem-container'>
          {cartItems == [] && (
            <>
              <h1>You do not have items in your cart.</h1>
              <Link href='/'>
                <a className='link-blue'>Back to shopping?</a>
              </Link>
            </>
          )}
          {!loading ? (
            <>
              {cartItems.map((item) => (
                <CartItem
                  item={item}
                  key={`${item.id} ${item.size}`}
                  review={true}
                ></CartItem>
              ))}
            </>
          ) : (
            <h1 className='text-center'>Loading</h1>
          )}
        </div>
      </div>

      <hr />

      <div className='total flex jc-c ai-fe col'>
        <p>Total: ${total}</p>
        <button className='order-btn' onClick={{}}>
          Process Payment
        </button>
      </div>
    </>
  );
}
