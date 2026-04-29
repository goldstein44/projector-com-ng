// src/pages/services/speakers-rental.tsx
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';

export default function SpeakersRental() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Speakers Rental Lekki - Sound System Hire | Projector Lekki</title>
        <meta name="description" content="Rent powerful speakers and sound systems in Lekki for events, parties and gatherings. Clear and loud audio with professional setup." />
      </Head>

      <Header />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">Speakers Rental Lekki</h1>
        <p className="text-3xl font-bold text-blue-600 mb-8">₦20,000 per day</p>
        <p className="text-lg mb-10">Powerful and clear sound system perfect for weddings, parties, church programs and outdoor events.</p>

        <div className="text-center">
          <a 
            href="https://wa.me/2348125146666" 
            className="inline-block bg-green-500 hover:bg-green-600 text-white text-xl font-bold px-16 py-5 rounded-full"
          >
            Rent Speakers Now - WhatsApp 08125146666
          </a>
        </div>
      </div>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}