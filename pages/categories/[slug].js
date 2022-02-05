import Layout from "@/components/Layout";
import BeverageItem from "@/components/BeverageItem";
import { API_URL } from "@/config/index";

export default function Menu({ drinks, titleSlug }) {
  return (
    <Layout>
      <main className='mt-3 menu p2'>
        <section>
          <h2 className='text-center' style={{ margin: "1rem 0" }}>
            {titleSlug.toUpperCase()}
          </h2>
          {drinks.length === 0 && <h2>No drinks here 😭</h2>}

          {drinks.map((drink) => (
            <BeverageItem key={drink.id} coffee={drink} />
          ))}
        </section>
      </main>
    </Layout>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const querySlug = slug.replace("-", "%20");
  const titleSlug = slug.replace("-", " ");
  const res = await fetch(`${API_URL}/coffees?type=${querySlug}`);
  const drinks = await res.json();

  return {
    props: { drinks, titleSlug },
  };
}
