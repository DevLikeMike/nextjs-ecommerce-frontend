import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import OrderContext from "@/context/OrderContext";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user } = useContext(AuthContext);
  const { orders, getUserOrders } = useContext(OrderContext);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setUsername(user.username);
      getUserOrders(user);
    }
  }, [user, getUserOrders]);

  // Submit handler hit register api route
  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
  };

  return (
    <>
      {user && <h1 style={{ fontSize: "2.85rem" }}>Hello, {user.username}</h1>}
      <div className='dashboard'>
        <section className='user__previousOrders'>
          <h2 className='text-center m-1'>Previous Orders</h2>
          {orders &&
            orders.orders.map((order) => (
              <div key={order.id} className='flex jc-sb orderItem'>
                <p className='p1'>
                  Order{" "}
                  <Link href={`${order.attributes.receipt_url}`}>
                    <a className='link-blue' target='_blank'>
                      #{order.attributes.checkout_session.slice(8, 18)}
                    </a>
                  </Link>{" "}
                </p>
                <p className='p1'>Total ${order.attributes.total.toFixed(2)}</p>
                <p className='p1'>{order.attributes.createdAt.slice(0, 10)}</p>
              </div>
            ))}
        </section>
        <section className='user__info'>
          <h2 className='text-center'>Information</h2>
          {user && (
            <form onSubmit={handleSubmit}>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                name='username'
                value={username}
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                value={email}
                placeholder='Email address'
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                value={newPassword}
                placeholder='Change Password'
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label htmlFor='password2'>Confirm Password</label>
              <input
                type='password'
                name='password2'
                value={confirmPassword}
                placeholder='Confirm Password'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <input type='submit' value='Update' className='update_button' />
            </form>
          )}
        </section>
      </div>
    </>
  );
}
