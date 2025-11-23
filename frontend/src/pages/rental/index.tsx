// pages/rental/index.tsx
import { GetStaticProps } from 'next';
import Head from 'next/head';
import ProductCard from '../../components/ProductCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import fs from 'fs';
import path from 'path';

interface RentalItem {
  id: string;
  slug: string;
  brand: string;
  model: string;
  price_per_day: number;
  lumens?: number;
  resolution?: string;
  hdmi?: boolean;
  vga?: boolean;
  description?: string;
}

interface RentalProps {
  rentals: RentalItem[];
}

export default function Rental({ rentals }: RentalProps) {
  return (
    <div>
      <Head>
        <title>Projector Rental in Lekki | Projector.online</title>
        <meta
          name="description"
          content="Affordable projector hire in Lekki, Ajah & Lagos. Same-day delivery. Bright, reliable projectors for events, churches & meetings."
        />
        <meta
          name="keywords"
          content="projector hire Lekki, projector rental Lekki, affordable projector hire near me, projector rental Lagos"
        />
      </Head>

      <Header />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-900">
          Projector Rental in Lekki & Ajah
        </h1>
        <p className="text-center text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
          Same-day delivery • Tested & bright projectors • Free pickup after event • Starting from ₦15,000/day
        </p>

        {rentals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {rentals.map((rental) => (
              <ProductCard
                key={rental.id}
                id={rental.id}
                slug={rental.slug}
                name={`${rental.brand} ${rental.model}`}
                image={`/rentals/${rental.slug}.jpg`}
                // Use `price` to carry the daily rental price so ProductCard does not require a `pricePerDay` prop
                price={rental.price_per_day}
                lumens={rental.lumens ?? 0}
                resolution={rental.resolution ?? ''}
                hdmi={rental.hdmi ?? true}
                vga={rental.vga ?? true}
                description={rental.description ?? ''}
                isRental={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-xl">
            <p className="text-2xl text-gray-600">
              No rental projectors available right now.
            </p>
            <p className="text-lg text-gray-500 mt-4">
              Check back soon or WhatsApp us for urgent rentals!
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const dataFile = path.join(process.cwd(), 'data', 'projectors.json');

  let rentals: RentalItem[] = [];

  if (fs.existsSync(dataFile)) {
    try {
      const rawData = fs.readFileSync(dataFile, 'utf-8');
      const jsonData = JSON.parse(rawData);

      rentals = (jsonData.rentals || []).map((item: any) => ({
        id: String(item.id ?? item.slug ?? Math.random()),
        slug: String(item.slug ?? item.id ?? '').replace(/\s+/g, '-').toLowerCase(),
        brand: String(item.brand ?? 'Unknown'),
        model: String(item.model ?? 'Projector'),
        price_per_day: Number(item.price_per_day ?? item.price ?? 15000),
        lumens: item.lumens !== undefined ? Number(item.lumens) : 0,
        resolution: item.resolution ? String(item.resolution) : '',
        hdmi: item.hdmi ?? true,
        vga: item.vga ?? true,
        description: item.description ? String(item.description) : '',
      }));
    } catch (error) {
      console.error('Error reading projectors.json:', error);
    }
  }

  return {
    props: {
      rentals,
    },
    revalidate: 30, // Update every 30 seconds when you add via admin
  };
};