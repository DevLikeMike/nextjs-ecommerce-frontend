import { API_URL } from "@/config/index";
import StyledHero from "@/components/StyledHero";
import StyledProductContainer from "@/components/StyledProductContainer";
import StyledProductCard from "@/components/StyledProductCard";

export default function Home({ returnedProducts: products }) {
  console.log(products);
  return (
    <div>
      <StyledHero />
      <h2>Start Shopping!</h2>
      <StyledProductContainer>
        {products.length === 0 && <h3>No Products :</h3>}
        {products.map((product) => (
          <StyledProductCard key={product.id} product={product} />
        ))}
      </StyledProductContainer>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/tshirts?populate=*`);
  let products = await res.json();
  let returnedProducts = products.data;

  return {
    props: { returnedProducts },
    revalidate: 1,
  };
}
