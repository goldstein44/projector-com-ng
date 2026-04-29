// src/pages/services/led-tv-rental.tsx
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';

export default function LedTvRental() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>LED TV Rental Lekki - Large Screen TV Hire | Projector Lekki</title>
        <meta name="description" content="Rent large LED TVs in Lekki for events, parties and displays. Sharp picture quality with easy setup. Same-day delivery available." />
      </Head>

      <Header />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">LED TV Rental Lekki</h1>
        <p className="text-3xl font-bold text-blue-600 mb-8">₦20,000 per day</p>
        <p className="text-lg mb-10">Great alternative to projectors when you need instant bright display without dark room.</p>

        <div className="bg-white p-10 rounded-2xl shadow mb-12">
          <h2 className="text-2xl font-semibold mb-6">Perfect For</h2>
          <ul className="list-disc pl-6 space-y-4 text-lg">
            <li>Outdoor daytime events</li>
            <li>Live sports viewing</li>
            <li>Small to medium gatherings</li>
            <li>Digital signage and displays</li>
          </ul>
        </div>

        <div className="text-center">
          <a 
            href="https://wa.me/2348125146666" 
            className="inline-block bg-green-500 hover:bg-green-600 text-white text-xl font-bold px-16 py-5 rounded-full"
          >
            Rent LED TV Now - WhatsApp 08125146666
          </a>
        </div>
      </div>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}