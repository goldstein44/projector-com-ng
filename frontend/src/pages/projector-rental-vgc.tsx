import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ProjectorRentalVGC() {
  return (
    <>
      <Head>
        <title>Projector Rental VGC, Chevron, Ikota & Ikota Villa</title>
        <meta name="description" content="Projector rental in VGC, Chevron Nigeria, Ikota, Ikota Villa Estate & surrounding areas. Same-day delivery for churches, estates & events." />
      </Head>
      <Header />
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-blue-900">Projector Rental in VGC & Chevron</h1>
        <p className="text-xl text-center text-gray-700 mb-12">Serving Victoria Garden City (VGC), Chevron Nigeria, Ikota, Ikota Villa Estate, Oral Estate and all nearby gated communities.</p>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Popular in VGC Area</h2>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>• Churches inside VGC & Ikota</li>
              <li>• Estate clubhouses</li>
              <li>• Chevron Cooperative events</li>
              <li>• Private home parties</li>
              <li>• Outdoor movie nights</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Why VGC Loves Us</h2>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>Navigate estate security smoothly</li>
              <li>Quick delivery via Lekki-Epe Expressway</li>
              <li>Bright projectors for outdoor use</li>
              <li>Flexible pickup timing</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-100 rounded-xl overflow-hidden mb-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.8!2d3.614!3d6.448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8e0e0e0e0e0e%3A0xe0e0e0e0e0e0e0e0!2sVGC%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000"
            width="100%" height="450" style={{border:0}} allowFullScreen loading="lazy"></iframe>
        </div>

        <div className="text-center">
          <a href="https://wa.me/2348125146666" className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 rounded-xl text-2xl font-bold inline-block">
            Book for VGC & Chevron Now
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}