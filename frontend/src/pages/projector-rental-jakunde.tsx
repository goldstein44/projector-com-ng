// src/pages/projector-rental-jakunde.tsx
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

export default function ProjectorRentalJakande() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Projector Rental Jakande - Rent Projector in Jakande Lekki</title>
        <meta 
          name="description" 
          content="Projector rental Jakande Lekki. Affordable HD and Normal projectors, screens, laptops, LED TVs and PA speakers with same-day delivery in Jakande, Lekki. Call 08125146666." 
        />
      </Head>

      <Header />

      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">Projector Rental Jakande Lekki</h1>
        <p className="text-2xl text-blue-600 font-semibold mb-8">Fast & Reliable AV Rentals in Jakande</p>

        <div className="prose max-w-none text-lg leading-relaxed">
          <p>
            Looking for projector rental in Jakande? Projector Lekki delivers high-quality projectors, 
            screens, laptops, LED TVs and sound systems directly to your location in Jakande, Lekki.
          </p>
          <p>
            Whether it's for a wedding, church program, corporate event, birthday party or business presentation, 
            we have the right equipment for you.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">Our Services in Jakande Include:</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>HD Projector Rental – ₦17,000/day</li>
            <li>Normal Projector Rental – ₦12,000/day</li>
            <li>6ft x 6ft Projector Screen – ₦15,000/day</li>
            <li>Laptop Rental – ₦15,000/day</li>
            <li>LED TV Rental – ₦20,000/day</li>
            <li>PA Speakers with Bluetooth – ₦20,000/day</li>
            <li>Professional Projector & Screen Installation</li>
          </ul>

          <p className="mt-8 font-medium">
            Same-day delivery available in Jakande and surrounding areas. 
            We deliver, set up, and pick up after your event.
          </p>
        </div>

        <div className="mt-12 text-center">
          <a 
            href="https://wa.me/2348125146666" 
            className="inline-block bg-green-500 hover:bg-green-600 text-white text-xl font-bold px-16 py-5 rounded-full"
          >
            Book Now - WhatsApp 08125146666
          </a>
        </div>
      </div>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}