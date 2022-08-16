import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "@/config/index";
import Link from "next/link";

const UserOrder = (session_id) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  /* Upon loading the success page
   *  Fetch the Order using the confirm endpoint.
   *  Confirm endpoint will change the status of the order if payment was successful
   *  Confirm endpoint will return an Object with the order and it's information
   */
  useEffect(() => {
    const fetchOrder = async () => {
      // Load while fetching order on confirm endpoint.
      setLoading(true);
      // Try to hit confirm endpoint and change status
      try {
        const res = await fetch(`${API_URL}/api/orders/confirm`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ checkout_session: `${session_id}` }),
        });
        // Recieve the order information back with the correct status
        const data = await res.json();
        // Set order to local state
        setOrder(data);
      } catch (error) {
        // If error leave order as null
        setOrder(null);
      }
      // End of loading sequence
      setLoading(false);
    };
    // Call fetch order to initiate
    fetchOrder();
  }, [session_id]);

  return { order, loading };
};

export default function SuccessPage({ session_id }) {
  // Destruct info from the strapi request via custom hook
  const { order, loading } = UserOrder(session_id);

  return (
    <div className='flex col success'>
      <h1 className='text-center'>Payment Successful, Thank you!</h1>
      {loading && <h2>Loading</h2>}
      {order && (
        <h5 className='text-center'>
          Order #: {order.checkout_session.slice(8, 25)}
        </h5>
      )}
      <div className='flex flex-center'>
        <Link href='/'>
          <a className='link-blue'>Go Back to homepage?</a>
        </Link>
        <Link href='/account/dashboard'>
          <a className='link-blue'>Go to Dashboard?</a>
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query: { session_id } }) {
  return {
    props: {
      session_id,
    },
  };
}
