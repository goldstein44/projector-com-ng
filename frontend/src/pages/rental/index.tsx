// frontend/pages/rental/index.tsx
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import ProductCard from '../../components/ProductCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';

interface RentalProps {
  rentals: Array<any>;
}

export default function Rental({ rentals }: RentalProps) {
  return (
    <div>
      <Head>
        <title>Projector Rental in Lekki | projector.online</title>
        <meta name="description" content="Projector hire Lekki, affordable projector rental near me" />
        <meta name="keywords" content="projector hire Lekki, projector rental Lekki, affordable projector hire near me" />
      </Head>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-10">
        {rentals.map(rental => (
          <ProductCard key={rental.id} {...rental} isRental={true} pricePerDay={rental.price_per_day} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}rentals/`);
  const rentals = res.data;
  return { props: { rentals } };
};
