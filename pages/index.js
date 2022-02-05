import FavoriteItem from "@/components/FavoriteItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function Home({ coffees }) {
  return (
    <Layout>
      <main className='mt-3 homescreen'>
        <div className='hero'>
          <h1>Coffee Cabinet</h1>
        </div>
        <section className='flex flex-center'>
          <h2>{"<Coffee To Code By />"}</h2>
        </section>
        <section className='section-dark flex flex-center'>
          <h2>
            We are a virtual coffee shop dedicated to serving you all the coffee
            you can ask for. We aim to please with our hot, iced, and decafe
            coffee products.
          </h2>
        </section>
        <section>
          <div className='fav-container'>
            {coffees.length === 0 && <h2>No coffees here 😭</h2>}

            {coffees.map((cof) => (
              <FavoriteItem key={cof.id} coffee={cof} />
            ))}
          </div>
        </section>
        <section className='section-dark flex flex-center'>
          <h2>
            We are a virtual coffee shop dedicated to serving you all the coffee
            you can ask for. We aim to please with our hot, iced, and decafe
            coffee products.
          </h2>
        </section>
        <section className='flex flex-center'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, dolor.
            Voluptatum quas, culpa optio minus earum aperiam labore
            exercitationem iure, velit, veritatis vero totam fuga. Natus dolore
            quidem numquam illum.
          </p>
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/coffees`);
  let coffees = await res.json();

  coffees = coffees.slice(0, 3);

  return {
    props: { coffees },
    revalidate: 1,
  };
}
