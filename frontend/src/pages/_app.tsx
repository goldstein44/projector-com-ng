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

        {/* ✅ FULL FAVICON + META SETUP */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;