// React imports
import { useContext, useState, useEffect } from "react";
// Next import
import { useRouter } from "next/router";
// Components and context imports
import Layout from "@/components/Layout";
import TrackerContainer from "@/components/TrackerContainer";
import CheckoutTracker from "@/components/CheckoutTracker";
import AuthContext from "@/context/AuthContext";

export default function ShippingPage() {
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Router declaration
  const router = useRouter();

  // Context Init and destruct
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setAddress(user.shippingAddress.address);
      setCity(user.shippingAddress.city);
      setCountry(user.shippingAddress.country);
      setPostalCode(user.shippingAddress.postalCode);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    router.push("/payment");
  };

  return (
    <Layout>
      <main className='mt-3 shipping p2'>
        <h1 className='text-center'>Shipping Info</h1>
        <TrackerContainer>
          <CheckoutTracker href='/shipping'>Shipping</CheckoutTracker>
          <CheckoutTracker href='/payment'>Payment</CheckoutTracker>
          <CheckoutTracker href='/confirm'>Confirm Order</CheckoutTracker>
        </TrackerContainer>
        <form onSubmit={submitHandler}>
          <label htmlFor='address'>Address Line 1:</label>
          <input
            type='text'
            name='address'
            placeholder='Please enter your address'
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            required
          />
          <label htmlFor='city'>City</label>
          <input
            type='text'
            name='city'
            placeholder='Please enter your city'
            onChange={(e) => setCity(e.target.value)}
            value={city}
            required
          />
          <label htmlFor='postalCode'>Postal Code</label>
          <input
            type='text'
            name='postalCode'
            placeholder='Please enter your postal code.'
            onChange={(e) => setPostalCode(e.target.value)}
            value={postalCode}
            required
          />
          <label htmlFor='country'>Country</label>
          <input
            type='text'
            name='country'
            placeholder='Please enter your country'
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            required
          />
          <input type='submit' value='Continue' />
        </form>
      </main>
    </Layout>
  );
}
