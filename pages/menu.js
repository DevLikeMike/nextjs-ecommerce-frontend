import Layout from "@/components/Layout";
import CategoryItem from "@/components/CategoryItem";
import { API_URL } from "@/config/index";

export default function Menu({ categories }) {
  return (
    <Layout>
      <main className='mt-3 menu'>
        <section className='p2'>
          <h1 className='text-center' style={{ margin: "1rem 0" }}>
            Drinks
          </h1>
          <div className='item-container'>
            {categories.length === 0 && <h2>No categories here 😭</h2>}

            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/categories`);
  const categories = await res.json();

  return {
    props: { categories },
    revalidate: 1,
  };
}
