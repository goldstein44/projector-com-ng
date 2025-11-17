// frontend/src/pages/rental/[slug].tsx
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';
import Link from 'next/link';

interface RentalDetailProps {
  rental: any;
}

export default function RentalDetail({ rental }: RentalDetailProps) {
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

        {/* Fixed: build the whole string inside a JS expression */}
        <p>{`₦${rental.price_per_day} per day`}</p>

        <p>{rental.description}</p>

        <p>
          {`Specs: Lumens: ${rental.lumens ?? 'N/A'} | Resolution: ${rental.resolution ?? 'N/A'}`}
        </p>

        <p>
          {`HDMI: ${rental.hdmi ? 'Yes' : 'No'} | VGA: ${rental.vga ? 'Yes' : 'No'}`}
        </p>

        {/* Link updated with data-testid for Cypress */}
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
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}rentals/${params?.slug}/`
  );
  const rental = res.data;
  return { props: { rental } };
};