// pages/contact.tsx
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Projector Lekki - AV Rentals</title>
        <meta name="description" content="Contact Projector Lekki for AV rentals in Lekki, Ajah, VI, Ikoyi, VGC. Same-day delivery available. WhatsApp 08125146666" />
      </Head>

      <Header />

      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-10">Contact Projector Lekki</h1>
        
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-2xl mb-8">
            For fast response, reach us on WhatsApp
          </p>
          
          <a
            href="https://wa.me/2348125146666"
            className="inline-block bg-green-500 hover:bg-green-600 text-white text-2xl font-bold px-12 py-6 rounded-2xl mb-10"
          >
            WhatsApp 08125146666
          </a>

          <p className="text-gray-600">
            We reply within 5 minutes during business hours.<br />
            Same-day delivery available across Lagos Island.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}