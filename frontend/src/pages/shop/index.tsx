// frontend/pages/shop/index.tsx
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import ProductCard from '../../components/ProductCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';

interface ShopProps {
  products: Array<any>;
}

export default function Shop({ products }: ShopProps) {
  return (
    <div>
      <Head>
        <title>Buy Projectors in Lekki | projector online</title>
        <meta name="description" content="Projectors for sale in Lagos, affordable deals in Lek

ki" />
        <meta name="keywords" content="buy projector in Lekki, projectors for sale in Lagos, projector deals Lekki" />
      </Head>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-10">
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/`);
  const products = res.data;
  return { props: { products } };
};
