import Head from "next/head";
import Footer from "./Footer";
import Header from "./navigation/Header";

function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='title' content='TechShirt Tshirts' />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default Layout;

Layout.defaultProps = {
  title: "TechShirt Tshirts",
};
