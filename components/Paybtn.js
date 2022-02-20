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
  background-color: ${({ theme }) => theme.primary400};
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
      Pay Now
    </PayButton>
  );
}
