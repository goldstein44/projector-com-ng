import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingForm from '../components/BookingForm';
import { useState } from 'react';

export default function Booking() {
  const [total, setTotal] = useState(0);

  // Callback to receive quantity, days, and pricePerUnit from BookingForm
  const handleTotalChange = (
    quantity: number,
    days: number,
    pricePerUnit: number,
    delivery: number = 0
  ) => {
    const newTotal = quantity * days * pricePerUnit + delivery;
    setTotal(newTotal);
  };

  return (
    <div>
      <Head>
        <title>Book Projector Rental in Lekki | Projector Online</title>
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
        <BookingForm
          onTotalChange={(quantity, days, pricePerUnit) => {
            // calculate delivery fee
            const deliverySelect = document.querySelector(
              'select[name="deliveryType"]'
            ) as HTMLSelectElement | null;

            const deliveryFee =
              deliverySelect?.value === 'DELIVERY' ? 3000 : 0;

            handleTotalChange(quantity, days, pricePerUnit, deliveryFee);
          }}
        />
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