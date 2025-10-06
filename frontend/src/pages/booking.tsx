//frontend/src/pages/booking.tsx
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingForm from '../components/BookingForm';
import { useState } from 'react';

export default function Booking() {
  const [total, setTotal] = useState(0);

  return (
    <div>
      <Head>
        <title>Book Projector Rental in Lekki | projector online</title>
        <meta
          name="description"
          content="Book projector in Lekki, easy rental booking"
        />
        <meta
          name="keywords"
          content="book projector in Lekki, projector hire Lekki, projector rental Lekki"
        />
      </Head>
      <Header />
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-4">Book a Projector</h1>
        {/* Pass callback to receive calculated total */}
        <BookingForm onTotalChange={setTotal} />
        {total > 0 && (
          <div className="mt-4 text-lg font-semibold">
            Final Total: ₦{total.toLocaleString()}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}