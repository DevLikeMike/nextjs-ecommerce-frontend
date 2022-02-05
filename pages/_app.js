import "../styles/index.scss";
import { ThemeProvider } from "styled-components";
import { theme } from "@/config/ThemeConfig";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
