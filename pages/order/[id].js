import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import OrderContext from "@/context/OrderContext";
import Layout from "@/components/Layout";
import CartItem from "@/components/CartItem";

export default function SingleOrder() {
  const router = useRouter();
  const orderId = router.query.id;
  const { order, getOrder } = useContext(OrderContext);

  useEffect(() => {
    if (orderId !== undefined) {
      getOrder(parseInt(orderId));
    }
  }, [orderId]);

  console.log(order);

  return (
    <Layout>
      <main className='mt-3 p2'>
        {orderId === undefined && <h1 className='text-center'>Loading</h1>}
        {order && (
          <>
            <h1 className='text-center'>
              Order Number:{" "}
              <span className='link-blue'>
                {order.checkout_session.slice(8, 25)}
              </span>
            </h1>
            {order.products.map((item) => (
              <CartItem item={item} key={`${item.id} ${item.size}`}></CartItem>
            ))}
          </>
        )}
      </main>
    </Layout>
  );
}
