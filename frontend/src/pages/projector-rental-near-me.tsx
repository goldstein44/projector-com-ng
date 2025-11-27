// pages/projector-rental-near-me.tsx
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function ProjectorRentalNearMe() {
  return (
    <>
      <Head>
        <title>Projector Rental Near Me – Same-Day Delivery Lekki, Ajah, VI, Ikoyi, VGC</title>
        <meta name="description" content="Projector rental near me with same-day delivery in Lekki, Ajah, Victoria Island, Ikoyi, VGC, Chevron from ₦15,000. WhatsApp now!" />
      </Head>
      <Header />
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-8 text-blue-900">
          Projector Rental Near Me – Same-Day Delivery
        </h1>
        <p className="text-2xl mb-12">Searching for <strong>projector rental near me</strong> in Lekki, Ajah, VI, Ikoyi or VGC?<br />We deliver and set up today – from ₦15,000.</p>
        <a href="https://wa.me/2348125146666" className="inline-block bg-green-600 hover:bg-green-700 text-white text-2xl font-bold px-12 py-6 rounded-xl mb-16">
          WhatsApp Now – Reply in 5 mins
        </a>
        {/* rest same as before */}
      </div>
      <Footer />
    </>
  );
}