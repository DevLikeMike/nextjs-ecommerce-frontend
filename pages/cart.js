import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import CartContext from "@/context/CartContext";
import CartItem from "@/components/CartItem";
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
    <>
      <div className='cartHeader flex jc-sb ai-c'>
        {!loading ? (
          <>
            <h1 className='text-center'>
              You have {cartItems.length}{" "}
              {cartItems.length === 1 ? "item" : "items"} in your cart.
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
              <h1>You have items in your cart.</h1>
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
                  review={false}
                ></CartItem>
              ))}
            </>
          ) : (
            <h1 className='text-center'>Loading</h1>
          )}
        </div>
        <button className='order-btn' onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </>
  );
}
