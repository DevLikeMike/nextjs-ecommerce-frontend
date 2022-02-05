import { useState, useEffect } from "react";
import { API_URL } from "@/config/index";
import Link from "next/link";

import Layout from "@/components/Layout";

// This method is called to confirm the payment is successful from stripe
const useOrder = (session_id) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/orders/confirm`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ checkout_session: `${session_id}` }),
        });

        const data = await res.json();
        setOrder(data);
      } catch (error) {
        setOrder(null);
      }
      setLoading(false);
    };
    fetchOrder();
  }, [session_id]);

  return { order, loading };
};

export default function SuccessPage({ session_id }) {
  // Destruct info from the strapi request via custom hook
  const { order, loading } = useOrder(session_id);

  return (
    <Layout>
      <main className='mt-3 p1 flex col success'>
        <h1 className='text-center'>Payment Successful, Thank you!</h1>
        {loading && <h2>Loading</h2>}
        {order && (
          <h2 className='text-center m-1 p1'>
            Order #: {order.checkout_session.slice(8, 25)}
          </h2>
        )}
        <div className='flex flex-center'>
          <Link href='/'>
            <a className='link-blue'>Go Back to homepage?</a>
          </Link>
          <Link href='/account/dashboard'>
            <a className='link-blue'>Go to Dashboard?</a>
          </Link>
        </div>
      </main>
    </Layout>
  );
}

export async function getServerSideProps({ query: { session_id } }) {
  return {
    props: {
      session_id,
    },
  };
}
