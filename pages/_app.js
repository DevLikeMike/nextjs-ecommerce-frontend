// Style imports
import "../styles/index.scss";
import { ThemeProvider } from "styled-components";
import { theme } from "@/config/ThemeConfig";
// Context wrapper imports
import { AuthProvider } from "@/context/AuthContext";
// import { CartProvider } from "@/context/CartContext";
// import { OrderProvider } from "@/context/OrderContext";
// Component imports
import Layout from "@/components/Layout";
import StyledMain from "@/components/StyledMain";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      {/* <CartProvider> */}
      {/* <OrderProvider> */}
      <ThemeProvider theme={theme}>
        <Layout>
          <StyledMain>
            <Component {...pageProps} />
          </StyledMain>
        </Layout>
      </ThemeProvider>
      {/* </OrderProvider> */}
      {/* </CartProvider> */}
    </AuthProvider>
  );
}

export default MyApp;
