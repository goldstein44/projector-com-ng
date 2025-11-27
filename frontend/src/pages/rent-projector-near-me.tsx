// pages/rent-projector-near-me.tsx
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function RentProjectorNearMe() {
  return (
    <>
      <Head>
        <title>Rent Projector Near Me – Same-Day Delivery in Lekki, Ajah, VI, Ikoyi, VGC</title>
        <meta name="description" content="Need a projector today? Same-day rental & delivery in Lekki, Ajah, Victoria Island, Ikoyi, VGC, Chevron, Sangotedo. From ₦15,000. Call/WhatsApp now!" />
      </Head>

      <Header />
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-blue-900">
          Rent a Projector Near Me – Same-Day Delivery Across Lagos Island
        </h1>
        <p className="text-2xl text-center mb-12">
          Looking for <strong>“rent projector near me”</strong> in Lekki, Ajah, VI, Ikoyi or VGC?<br />
          We deliver and set up within hours – from ₦15,000/day.
        </p>

        <div className="text-center mb-12">
          <a href="https://wa.me/2348125146666" className="inline-block bg-green-600 hover:bg-green-700 text-white text-2xl font-bold px-12 py-6 rounded-xl">
            WhatsApp Now – Reply in 5 mins
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-lg">
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <h3 className="font-bold text-xl mb-3">Same-Day Delivery</h3>
            <p>Order before 2pm → delivered today in Lekki, Ajah, VI, Ikoyi, VGC</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <h3 className="font-bold text-xl mb-3">Bright & Guaranteed</h3>
            <p>All projectors tested. If it fails → you don’t pay</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <h3 className="font-bold text-xl mb-3">Free Pickup</h3>
            <p>We collect after your event – no stress</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8">We Cover Everywhere on the Island</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-lg">
            <Link href="/projector-rental-lekki" className="text-blue-600 hover:underline font-medium">Lekki Phase 1 & 2</Link>
            <Link href="/projector-rental-ajah" className="text-blue-600 hover:underline font-medium">Ajah & Sangotedo</Link>
            <Link href="/projector-rental-victoria-island" className="text-blue-600 hover:underline font-medium">Victoria Island</Link>
            <Link href="/projector-rental-ikoyi" className="text-blue-600 hover:underline font-medium">Ikoyi & Banana Island</Link>
            <Link href="/projector-rental-vgc" className="text-blue-600 hover:underline font-medium">VGC & Chevron</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}