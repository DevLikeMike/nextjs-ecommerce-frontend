import { API_URL } from "@/config/index";

export default function Home({ products }) {
  console.log(products);
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/tshirts?populate=*`);
  let products = await res.json();

  return {
    props: { products },
    revalidate: 1,
  };
}
