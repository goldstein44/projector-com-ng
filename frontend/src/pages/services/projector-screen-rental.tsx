// src/pages/services/projector-screen-rental.tsx
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';

export default function ProjectorScreenRental() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Projector Screen Rental Lekki - 96x96 Screen | Projector Lekki</title>
        <meta 
          name="description" 
          content="Rent high-quality 96x96 projector screens in Lekki. Perfect for events, presentations, weddings and church programs. Same-day delivery available." 
        />
      </Head>

      <Header />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">Projector Screen Rental Lekki</h1>
        <p className="text-3xl font-bold text-blue-600 mb-8">96" x 96" Projection Screen</p>
        <p className="text-2xl mb-10">₦13,000 per day</p>

        <div className="bg-white p-10 rounded-2xl shadow mb-12">
          <h2 className="text-2xl font-semibold mb-6">Why Choose Our Projection Screen?</h2>
          <ul className="list-disc pl-6 space-y-4 text-lg">
            <li>High-quality matte white surface for clear, bright images</li>
            <li>Easy to set up with stand or wall mount</li>
            <li>Ideal for indoor and outdoor events</li>
            <li>Works perfectly with both HD and Normal projectors</li>
            <li>Professional delivery and setup available</li>
          </ul>
        </div>

        <div className="text-center">
          <a 
            href="https://wa.me/2348125146666" 
            className="inline-block bg-green-500 hover:bg-green-600 text-white text-xl font-bold px-16 py-5 rounded-full"
          >
            Rent Screen Now - WhatsApp 08125146666
          </a>
        </div>
      </div>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}