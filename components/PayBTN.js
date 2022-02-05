import styled from "styled-components";
import { NEXT_URL } from "@/config/index";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PK, API_URL } from "@/config/index";

const PayButton = styled.button`
  margin: 2rem auto 0.25rem;
  width: 100%;
  max-width: 30rem;
  padding: 1rem;
  color: #ffffff;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primaryYellow};
  border: none;

  & span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
  }

  & span:after {
    content: "»";
    position: absolute;
    opacity: 0;
    top: 0;
    right: -15px;
    transition: 0.5s;
  }

  &:hover span {
    padding-right: 15px;
  }

  &:hover span:after {
    opacity: 1;
    right: 0;
  }
`;

// Items from cart must be an array of objects
// Each item has name, price, id, quantity and size
const payHandler = async (itemsFromCart) => {
  const stripe = await loadStripe(STRIPE_PK);

  // Next request for get token
  const res = await fetch(`${NEXT_URL}/api/getToken`, {
    method: "GET",
  });

  const { token } = await res.json();

  // Strapi request for Order - create
  const strapiRes = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ products: itemsFromCart }),
  });

  const session = await strapiRes.json();

  const result = await stripe.redirectToCheckout({
    sessionId: session.id,
  });
};

export default function PayBTN({ itemsFromCart }) {
  return (
    <PayButton onClick={() => payHandler(itemsFromCart)} value='Buy'>
      <span>Pay Now</span>
    </PayButton>
  );
}
