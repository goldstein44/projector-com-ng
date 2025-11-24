// frontend/src/pages/rental/[slug].tsx
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';
import Link from 'next/link';

interface RentalDetailProps {
  rental: any | null;
}

export default function RentalDetail({ rental }: RentalDetailProps) {
  if (!rental) {
    return (
      <div>
        <Header />
        <div className="p-10 text-center">
          <h1 className="text-2xl font-bold">Rental not found</h1>
          <p>Sorry, the rental you are looking for does not exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{rental.name} for Rent in Lekki | projector.online</title>
        <meta name="description" content={rental.description} />
        <meta
          name="keywords"
          content={`rent ${rental.name}, projector hire Lekki, projector rental Lekki`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
          {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": "${rental.name}",
            "image": "${rental.image || '/placeholder.jpg'}",
            "description": "${rental.description}",
            "brand": "${rental.brand || ''}",
            "offers": {
              "@type": "Offer",
              "url": "https://projector.online/rental/${rental.slug}",
              "priceCurrency": "NGN",
              "price": "${rental.price_per_day}",
              "availability": "https://schema.org/InStock",
              "itemOffered": {
                "@type": "Service",
                "name": "Projector Rental",
                "serviceType": "Rental"
              }
            }
          }
        `,
          }}
        />
      </Head>
      <Header />
      <div className="p-10">
        <Image
          src={rental.image || '/placeholder.jpg'}
          alt={rental.name}
          width={500}
          height={300}
        />
        <h1 className="text-2xl font-bold">{rental.name}</h1>

        <p>{`₦${rental.price_per_day} per day`}</p>
        <p>{rental.description}</p>
        <p>
          {`Specs: Lumens: ${rental.lumens ?? 'N/A'} | Resolution: ${
            rental.resolution ?? 'N/A'
          }`}
        </p>
        <p>{`HDMI: ${rental.hdmi ? 'Yes' : 'No'} | VGA: ${
          rental.vga ? 'Yes' : 'No'
        }`}</p>

        <Link
          href={`/booking?projectorId=${rental.id}`}
          className="bg-blue-500 text-white px-4 py-2 mt-4 inline-block"
          data-testid="book-now-link"
        >
          Book Now
        </Link>

        <div className="mt-4">
          <h2>Reviews</h2>
          <p>No reviews yet.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string | undefined;
  if (!slug) return { notFound: true };

  let base = process.env.NEXT_PUBLIC_BACKEND_URL || '';
  base = base.replace(/\/+$/, '');
  if (!base.startsWith('http')) base = `https://${base}`;

  try {
    const res = await axios.get(`${base}/api/rentals/${slug}/`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
        Accept: 'application/json',
      },
      timeout: 5000,
    });

    return { props: { rental: res.data } };
  } catch (err: any) {
    console.error(
      'SSR fetch failed:',
      err.response?.status,
      err.response?.data || err.message
    );

    // Fallback: return null so the page can still render
    return { props: { rental: null } };
  }
};