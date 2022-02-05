import { useContext, useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import CartContext from "@/context/CartContext";
import { useRouter } from "next/router";

export default function CoffeePage({ coffee }) {
  // Init states
  const [cartItem, setcartItem] = useState({});
  const [size, setSize] = useState("medium");

  // Init context
  const { addCartItem } = useContext(CartContext);

  // Init router
  const router = useRouter();

  // Update cartItem on size change
  useEffect(() => {
    setcartItem({
      name: coffee.name,
      quantity: 1,
      id: coffee.id,
      price: coffee.price,
      size: size,
      image: coffee.image,
    });
  }, [size]);

  // Handlers
  const sizeHandler = (e) => {
    setSize(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addCartItem(cartItem);
    router.push("/cart");
  };

  return (
    <Layout>
      <main className='mt-3 beverage'>
        <h1 className='text-center'>{coffee.name}</h1>
        <div className='image_container'>
          <img src={coffee.image.formats.large.url} alt={coffee.name} />
        </div>
        <div className='price'>${coffee.price.toFixed(2)}</div>
        <p className='content'>{coffee.description}</p>
        <form onSubmit={submitHandler}>
          <select name='size' id='size' onChange={sizeHandler}>
            <option value='small'>Small</option>
            <option value='medium'>Medium</option>
            <option value='large'>Large</option>
          </select>
          <input type='submit' value='Add to cart' />
        </form>
      </main>
    </Layout>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/coffees?slug=${slug}`);
  const coffees = await res.json();

  return {
    props: {
      coffee: coffees[0],
    },
  };
}
