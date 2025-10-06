// frontend/src/pages/_app.tsx
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CartProvider } from '../../context/CartContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Head>
        <title>projector online - Buy or Rent Projectors in Lekki Ajah</title>
        <meta
          name="description"
          content="Affordable projectors for sale and hire in Lekki Ajah, Lagos. Keywords: buy projector in Lekki Ajah, projector hire Lekki Ajah, projector rental Lekki Ajah"
        />
      </Head>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;