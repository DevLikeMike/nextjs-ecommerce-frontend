import { useContext, useState, useEffect } from "react";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function Shipping() {
  const router = useRouter();

  // Local state
  const [shippingAddress, setShippingAddress] = useState({});
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");

  // Context init and destruct
  const { user, editUserShipping } = useContext(AuthContext);

  let {
    city: userCity,
    state: userState,
    zip: userZipCode,
    street: userStreet,
  } = user.shippingAddress;
  // Set Shipping Address local state on change of other variables.
  useEffect(() => {
    setShippingAddress({
      city: city,
      street: street,
      zip: zipCode,
      state: state,
    });
  }, [city, street, zipCode, state]);

  // Make sure a user is signed in, if not redirect to login page. Change local shipping state to user shipping saved in db
  useEffect(() => {
    if (user) {
      if (user.shippingAddress !== {}) {
        setShippingAddress({
          city: userCity,
          state: userState,
          street: userStreet,
          zip: userZipCode,
        });
      }
    } else {
      router.push("/account/login");
    }
  }, []);

  // Make sure shipping address is not blank, submit shipping address to user, if ok proceed to checkout
  const submitHandler = (e) => {
    e.preventDefault();
    if (shippingAddress !== {}) {
      editUserShipping(shippingAddress, user);
    }
  };
  return (
    <div className='shipping'>
      <h1>Enter Your Shipping Address</h1>
      <form className='flex flex-center col' onSubmit={submitHandler}>
        <label htmlFor='city'>City</label>
        <input
          type='text'
          name='city'
          onChange={(e) => {
            setCity(e.target.value);
          }}
          placeholder={userCity ? `${userCity}` : ""}
          required
        />

        <label htmlFor='state'>State</label>
        <input
          type='text'
          name='state'
          onChange={(e) => {
            setState(e.target.value);
          }}
          placeholder={userState ? `${userState}` : ""}
          required
        />

        <label htmlFor='street'>Street</label>
        <input
          type='text'
          name='street'
          onChange={(e) => {
            setStreet(e.target.value);
          }}
          placeholder={userStreet ? `${userStreet}` : ""}
          required
        />

        <label htmlFor='zip'>ZipCode</label>
        <input
          type='text'
          name='zip'
          onChange={(e) => {
            setZipCode(e.target.value);
          }}
          placeholder={userZipCode ? `${userZipCode}` : ""}
          required
        />

        <input type='submit' value='Continue To Payment' />
      </form>
    </div>
  );
}
