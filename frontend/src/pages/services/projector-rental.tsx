// src/pages/services/projector-rental.tsx
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';

export default function ProjectorRental() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Projector Rental Lekki - HD & Normal Projectors | Projector Lekki</title>
        <meta name="description" content="Rent HD and Normal Projectors in Lekki from ₦12,000/day. Perfect for events, weddings, conferences, churches and parties. Same-day delivery and setup available." />
      </Head>

      <Header />

      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">Projector Rental Lekki</h1>
        <p className="text-2xl text-blue-600 font-semibold mb-10">HD Projectors &amp; Normal Projectors</p>

        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-2xl font-bold mb-4">HD Projector</h3>
            <p className="text-5xl font-bold text-blue-600 mb-4">₦15,000/day</p>
            <p className="text-gray-600">High brightness and clarity. Ideal for large venues, weddings, and professional presentations.</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-2xl font-bold mb-4">Normal Projector</h3>
            <p className="text-5xl font-bold text-blue-600 mb-4">₦12,000/day</p>
            <p className="text-gray-600">Reliable and affordable option for smaller events, meetings, and daily use.</p>
          </div>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow mb-12">
          <h2 className="text-2xl font-semibold mb-6">Why Rent From Us?</h2>
          <ul className="space-y-4 text-lg">
            <li>✓ All projectors are tested before delivery</li>
            <li>✓ HDMI, VGA cables included</li>
            <li>✓ Same-day delivery in Lekki, Ajah, VI, Ikoyi &amp; more</li>
            <li>✓ Professional setup available</li>
            <li>✓ We pick up after your event</li>
          </ul>
        </div>

        <div className="text-center">
          <a href="https://wa.me/2348125146666" 
             className="inline-block bg-green-500 hover:bg-green-600 text-white text-xl font-bold px-16 py-5 rounded-full">
            Book Projector Now - WhatsApp 08125146666
          </a>
        </div>
      </div>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}