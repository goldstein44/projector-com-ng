import { GetServerSideProps } from 'next';
import Head from 'next/head';
import ProductCard from '../../components/ProductCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';

interface RentalProps {
  rentals: Array<{
    id: number;
    name: string;
    description: string;
    price_per_day: number;
    image_url?: string;
    slug?: string;
    lumens?: number;
    resolution?: string;
    hdmi?: boolean;
    vga?: boolean;
    [key: string]: any;
  }>;
}

export default function Rental({ rentals }: RentalProps) {
  return (
    <div>
      <Head>
        <title>Projector Rental in Lekki | projector.online</title>
        <meta
          name="description"
          content="Projector hire Lekki, affordable projector rental near me"
        />
        <meta
          name="keywords"
          content="projector hire Lekki, projector rental Lekki, affordable projector hire near me"
        />
      </Head>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-10">
        {rentals.map((rental) => (
          <ProductCard
            key={rental.id}
            id={rental.id.toString()}
            slug={rental.slug || rental.id.toString()}
            name={rental.name || 'Unknown Projector'}
            image={rental.image_url || '/images/placeholder.jpg'}
            price={0} // rentals don’t use price
            pricePerDay={rental.price_per_day || 0}
            lumens={rental.lumens ?? 2000}
            resolution={rental.resolution || '1080p'}
            hdmi={rental.hdmi ?? true}
            vga={rental.vga ?? false}
            isRental={true}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Normalize backend base (remove trailing slashes) and append /api
  const rawBase = process.env.NEXT_PUBLIC_BACKEND_URL || '';
  const base = rawBase.replace(/\/+$/, ''); // remove trailing slashes
  const API_BASE = `${base}/api`;

  try {
    const res = await axios.get(`${API_BASE}/rentals/?limit=100`);
    const rentals = res.data;

    const safeRentals = rentals.map((r: any) => ({
      ...r,
      // Ensure serializable and safe defaults
      created_at: r.created_at ? new Date(r.created_at).toISOString() : null,
      updated_at: r.updated_at ? new Date(r.updated_at).toISOString() : null,
      image_url: r.image_url || '/images/placeholder.jpg',
      slug: r.slug || r.id.toString(),
      lumens: r.lumens ?? 2000,
      resolution: r.resolution || '1080p',
      hdmi: r.hdmi ?? true,
      vga: r.vga ?? false,
      price_per_day: r.price_per_day || 0,
    }));

    return { props: { rentals: safeRentals } };
  } catch (error) {
    console.error('Error fetching rentals:', error);
    return { props: { rentals: [] } };
  }
};