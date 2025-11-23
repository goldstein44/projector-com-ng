import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ProjectorRentalIkoyi() {
  return (
    <>
      <Head>
        <title>Projector Rental Ikoyi & Banana Island – Premium Service</title>
        <meta name="description" content="High-end projector rental in Ikoyi, Banana Island, Parkview Estate & Bourdillon Road. Perfect for private screenings, board meetings & luxury events." />
      </Head>
      <Header />
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-blue-900">Projector Rental in Ikoyi & Banana Island</h1>
        <p className="text-xl text-center text-gray-700 mb-12">Discreet, premium projector rental for Ikoyi, Banana Island, Parkview Estate, Bourdillon, Glover Road and surrounding luxury areas.</p>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Exclusive Locations</h2>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>• Banana Island private residences</li>
              <li>• Ikoyi Club 1938</li>
              <li>• Luxury penthouses & mansions</li>
              <li>• High-end boardrooms</li>
              <li>• Private home cinemas</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Premium Experience</h2>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>4K & laser projectors available</li>
              <li>Professional installation</li>
              <li>Silent, discreet service</li>
              <li>Flexible timing for private events</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-100 rounded-xl overflow-hidden mb-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.2!2d3.432!3d6.450!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4e4e4e4e4e4%3A0xe4e4e4e4e4e4e4e4!2sIkoyi%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000"
            width="100%" height="450" style={{border:0}} allowFullScreen loading="lazy"></iframe>
        </div>

        <div className="text-center">
          <a href="https://wa.me/2348125146666" className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 rounded-xl text-2xl font-bold inline-block">
            Book for Ikoyi & Banana Island
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}