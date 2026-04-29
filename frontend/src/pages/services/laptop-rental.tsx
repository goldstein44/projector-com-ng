// src/pages/services/laptop-rental.tsx
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';

export default function LaptopRental() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Laptop Rental Lekki - High Performance Laptops | Projector Lekki</title>
        <meta name="description" content="Rent high-performance laptops in Lekki for presentations, events and meetings. Reliable laptops with fast setup. Same-day delivery available." />
      </Head>

      <Header />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">Laptop Rental Lekki</h1>
        <p className="text-3xl font-bold text-blue-600 mb-8">₦10,000 per day</p>
        <p className="text-lg mb-10">Perfect for PowerPoint presentations, video playback, and live demonstrations.</p>

        <div className="bg-white p-10 rounded-2xl shadow mb-12">
          <h2 className="text-2xl font-semibold mb-6">Laptop Features</h2>
          <ul className="list-disc pl-6 space-y-4 text-lg">
            <li>Windows 10/11 with Microsoft Office installed</li>
            <li>HDMI port for easy projector connection</li>
            <li>Long battery life</li>
            <li>Fast performance for smooth presentations</li>
            <li>Delivered fully charged and ready to use</li>
          </ul>
        </div>

        <div className="text-center">
          <a 
            href="https://wa.me/2348125146666" 
            className="inline-block bg-green-500 hover:bg-green-600 text-white text-xl font-bold px-16 py-5 rounded-full"
          >
            Rent Laptop Now - WhatsApp 08125146666
          </a>
        </div>
      </div>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}