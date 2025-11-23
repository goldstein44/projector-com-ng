import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function ProjectorRentalLekki() {
  return (
    <>
      <Head>
        <title>Projector Rental Lekki Phase 1 & 2 – Same-Day Delivery</title>
        <meta name="description" content="Projector rental in Lekki Phase 1, Phase 2, Osapa London, Ikate, Agungi, and nearby estates. Same-day delivery from ₦15,000. Perfect for church services, weddings, seminars & home cinema." />
      </Head>
      <Header />
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Projector Rental in Lekki Phase 1 & 2</h1>
        <p className="text-xl text-center text-gray-700 mb-12">Same-day delivery to Lekki Phase 1, Phase 2, Osapa London, Ikate, Agungi, Chevron Drive, Admiralty Way, Freedom Way and all estates around.</p>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Popular Venues We Serve in Lekki</h2>
            <ul className="space-y-2 text-lg">
              <li>• The Ark Event Centre, Lekki</li>
              <li>• Eko Hotel Convention Centre (nearby)</li>
              <li>• RCCG City of David, Lekki</li>
              <li>• House on the Rock, Lekki</li>
              <li>• Landmark Event Centre (5 mins away)</li>
              <li>• Numerous estates & churches in Osapa, Ikate & Agungi</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Why Lekki Loves Us</h2>
            <ul className="space-y-2 text-lg">
              <li>✓ Same-day delivery (order before 2pm)</li>
              <li>✓ Bright 4K & 1080p projectors</li>
              <li>✓ Free setup & pickup</li>
              <li>✓ 24/7 WhatsApp support</li>
              <li>✓ Used by top churches & event planners</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-100 rounded-xl p-8 mb-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.693159397981!2d3.465250675839477!3d6.435250893545399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4f876c7e7c5%3A0x79e7e7e7e7e7e7e7!2sLekki%20Phase%201!5e0!3m2!1sen!2sng!4v1700000000000"
            width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy">
          </iframe>
        </div>

        <div className="text-center">
          <a href="https://wa.me/2348125146666" className="bg-green-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-green-700 inline-block">
            Book Projector for Lekki Now
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}