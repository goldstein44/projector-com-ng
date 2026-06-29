// src/pages/services/led-tv-rental.tsx
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';

export default function LedTvRental() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>55 Inch Smart LED TV Rental Lekki - ₦35,000/day | Projector Lekki</title>
        <meta 
          name="description" 
          content="Rent 55 inch Smart Android LED TV in Lekki. Sharp picture quality with HDMI connectivity. Perfect for events, presentations, and displays. Same-day delivery available." 
        />
      </Head>

      <Header />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">55 Inch Smart LED TV Rental Lekki</h1>
        <p className="text-3xl font-bold text-blue-600 mb-8">₦35,000 per day</p>

        <div className="bg-white p-10 rounded-2xl shadow mb-12">
          <h2 className="text-2xl font-semibold mb-6">TV Specifications</h2>
          <ul className="list-disc pl-6 space-y-4 text-lg">
            <li>55 Inch Smart Android LED TV</li>
            <li>High resolution with excellent picture quality</li>
            <li>Built-in Android OS</li>
            <li>Multiple HDMI connectors</li>
            <li>USB ports for easy media playback</li>
            <li>Clear sound output</li>
            <li>Perfect for events, presentations, and displays</li>
          </ul>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow mb-12">
          <h2 className="text-2xl font-semibold mb-6">Why Choose Our LED TV?</h2>
          <ul className="list-disc pl-6 space-y-4 text-lg">
            <li>Bright and clear even in well-lit rooms</li>
            <li>Easy HDMI connection to laptops and projectors</li>
            <li>Ideal alternative when dark room is not possible</li>
            <li>Same-day delivery and setup in Lekki and Lagos Island</li>
            <li>Professional technical support</li>
          </ul>
        </div>

        <div className="text-center">
          <a 
            href="https://wa.me/2348125146666" 
            className="inline-block bg-green-500 hover:bg-green-600 text-white text-xl font-bold px-16 py-5 rounded-full"
          >
            Rent 55 Inch Smart LED TV Now - WhatsApp 08125146666
          </a>
        </div>
      </div>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}