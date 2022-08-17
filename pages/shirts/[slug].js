import { useContext, useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import CartContext from "@/context/CartContext";
import { useRouter } from "next/router";

export default function ProductPage({ product }) {
  // Init states
  const [cartItem, setcartItem] = useState({});
  const [size, setSize] = useState("medium");
  const [qty, setQty] = useState(1);

  // Init context
  const { addCartItem } = useContext(CartContext);

  // Init router
  const router = useRouter();

  // Destruct from product
  const { Name, Price, Description, inStock } = product.attributes;
  const { id } = product;
  const { url: photoURL } =
    product.attributes.photo.data.attributes.formats.large;

  // Update cartItem on size change
  useEffect(() => {
    setcartItem({
      name: Name,
      quantity: qty,
      price: Price,
      size: size,
      id: id,
      image: `${API_URL}${photoURL}`,
    });
  }, [size]);

  // Handlers
  const sizeHandler = (e) => {
    setSize(e.target.value);
  };
  const qtyHandler = (e) => {
    setQty(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(cartItem);
    addCartItem(cartItem);
    router.push("/cart");
  };

  return (
    <div className='product-page-wrapper'>
      <div className='product__image-container'>
        <img src={`${API_URL}${photoURL}`} alt={Name} />
      </div>
      <div className='product__content-container'>
        <h1>{Name}</h1>
        <p className='description'>{Description}</p>
        <div className='price-stock flex ai-fe jc-sb'>
          <p className='price'>${Price}</p>
          <p className={`inStock ${inStock} text-center`}>
            {inStock ? "In Stock" : "Out Of Stock"}
          </p>
        </div>

        <form onSubmit={submitHandler}>
          <label htmlFor='size'>Size</label>
          <select name='size' id='size' onChange={sizeHandler}>
            <option value='small'>Small</option>
            <option value='medium'>Medium</option>
            <option value='large'>Large</option>
          </select>
          <label htmlFor='quantity'>Quantity</label>
          <select name='quantity' id='quantity' onChange={qtyHandler}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </select>
          <input type='submit' value='Add to cart' />
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(
    `https://nextjs-ecom-tshirt.herokuapp.com/api/tshirts?filters[slug][$eq]=${slug}&populate=*`
  );
  const products = await res.json();
  const product = products.data[0];

  return {
    props: {
      product,
    },
  };
}
