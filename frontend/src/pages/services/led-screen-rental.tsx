// src/pages/services/led-screen-rental.tsx
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';

export default function LedScreenRental() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>LED Screen Rental Lekki - Large LED Video Wall Hire | Projector Lekki</title>
        <meta 
          name="description" 
          content="Rent high-quality LED screens in Lekki, Jakande, Ajah and Lagos Island. Bright outdoor and indoor LED screens for events, weddings, church programs, conferences and parties. Same-day delivery and setup." 
        />
      </Head>

      <Header />

      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">LED Screen Rental Lekki</h1>
        <p className="text-3xl font-semibold text-blue-600 mb-10">
          Large Bright LED Screens for Events
        </p>

        <div className="prose max-w-none text-lg leading-relaxed mb-12">
          <p>
            Professional LED screen rental service in Lekki and Lagos Island. 
            Our bright, high-resolution LED screens are perfect for outdoor events, 
            weddings, church programs, corporate functions, concerts and exhibitions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-4">Rental</h3>
            <p className="text-gray-600">
              Daily and event-based rental of various sizes of LED screens with full technical support.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-4">Sales</h3>
            <p className="text-gray-600">
              Brand new LED screens available for outright purchase with warranty and installation.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-4">Installation</h3>
            <p className="text-gray-600">
              Professional mounting, rigging and setup for both temporary and permanent installations.
            </p>
          </div>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow mb-12">
          <h2 className="text-2xl font-semibold mb-6">Ideal For:</h2>
          <ul className="list-disc pl-6 space-y-3 text-lg">
            <li>Outdoor events and parties</li>
            <li>Church and crusade programs</li>
            <li>Corporate exhibitions and conferences</li>
            <li>Weddings and live streaming</li>
            <li>Product launches and promotions</li>
          </ul>
        </div>

        <div className="text-center">
          <a 
            href="https://wa.me/2348125146666" 
            className="inline-block bg-green-500 hover:bg-green-600 text-white text-xl font-bold px-16 py-5 rounded-full"
          >
            Rent LED Screen Now - WhatsApp 08125146666
          </a>
        </div>
      </div>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}