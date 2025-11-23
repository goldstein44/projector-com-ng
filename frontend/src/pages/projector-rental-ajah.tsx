import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ProjectorRentalAjah() {
  return (
    <>
      <Head>
        <title>Projector Rental Ajah & Sangotedo – From ₦15,000/day</title>
        <meta name="description" content="Projector rental in Ajah, Sangotedo, Abraham Adesanya, Awoyaya, Badore, Thomas Estate & Crown Estate. Same-day delivery for events & churches." />
      </Head>
      <Header />
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-blue-900">Projector Rental in Ajah & Sangotedo</h1>
        <p className="text-xl text-center text-gray-700 mb-12">Serving Ajah, Sangotedo, Abraham Adesanya, Awoyaya, Badore, Thomas Estate, Crown Estate, Addo Road and the entire Lekki-Epe corridor.</p>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Popular Locations in Ajah</h2>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>• RCCG Resurrection Parish, Ajah</li>
              <li>• De Praise Event Centre</li>
              <li>• Grace Springs Event Centre</li>
              <li>• Churches in Abraham Adesanya & Sangotedo</li>
              <li>• Numerous estates & hotels along Lekki-Epe Expressway</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Why Ajah Clients Love Us</h2>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>Fast delivery along Lekki-Epe Expressway</li>
              <li>Affordable rates from ₦15,000/day</li>
              <li>Free pickup after your event</li>
              <li>Projectors tested & guaranteed bright</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-100 rounded-xl overflow-hidden mb-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.9!2d3.567!3d6.465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d3e8f8f8f8f%3A0x8f8f8f8f8f8f8f8f!2sAjah%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000"
            width="100%" height="450" style={{border:0}} allowFullScreen loading="lazy"></iframe>
        </div>

        <div className="text-center">
          <a href="https://wa.me/2348125146666" className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 rounded-xl text-2xl font-bold inline-block">
            Book Projector for Ajah Now
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}