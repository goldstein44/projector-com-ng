import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ProjectorRentalVI() {
  return (
    <>
      <Head>
        <title>Projector Rental Victoria Island & Eko Atlantic – Corporate Events</title>
        <meta name="description" content="Professional projector rental in Victoria Island, Eko Atlantic, Oniru & Ahmadu Bello Way. Ideal for corporate meetings, conferences & product launches." />
      </Head>
      <Header />
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-blue-900">Projector Rental Victoria Island (VI)</h1>
        <p className="text-xl text-center text-gray-700 mb-12">Serving Victoria Island, Eko Atlantic, Oniru, Ahmadu Bello Way, Adeola Odeku, Adeola Hopewell and all corporate offices.</p>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Top Venues in VI</h2>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>• Eko Hotel & Suites Convention Centre</li>
              <li>• Civic Centre</li>
              <li>• Landmark Event Centre</li>
              <li>• Oriental Hotel</li>
              <li>• Hard Rock Cafe Lagos</li>
              <li>• Corporate boardrooms on Ahmadu Bello & Adeola Odeku</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Perfect for Corporate Use</h2>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>Ultra-bright projectors for daylight presentations</li>
              <li>Wireless & HDMI connectivity</li>
              <li>Professional setup by technicians</li>
              <li>Discreet delivery & pickup</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-100 rounded-xl overflow-hidden mb-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.3!2d3.418!3d6.428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4d2e6b1b1b1%3A0xb1b1b1b1b1b1b1b1!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000"
            width="100%" height="450" style={{border:0}} allowFullScreen loading="lazy"></iframe>
        </div>

        <div className="text-center">
          <a href="https://wa.me/2348125146666" className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 rounded-xl text-2xl font-bold inline-block">
            Book for Victoria Island Now
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}