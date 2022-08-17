import { API_URL } from "@/config/index";
import StyledProductContainer from "@/components/StyledProductContainer";
import StyledProductCard from "@/components/StyledProductCard";

export default function Shirts({ returnedProducts: products }) {
  return (
    <>
      <h2 style={{ fontWeight: "200" }}>Our Top Picks</h2>
      <StyledProductContainer>
        {products.length === 0 && <h3>No Products :</h3>}
        {products.map((product) => (
          <StyledProductCard key={product.id} product={product} />
        ))}
      </StyledProductContainer>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `https://nextjs-ecom-tshirt.herokuapp.com/api/tshirts?populate=*`
  );
  let products = await res.json();
  let returnedProducts = products.data;

  return {
    props: { returnedProducts },
  };
}
