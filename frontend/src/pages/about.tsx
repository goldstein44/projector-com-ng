// src/pages/about.tsx
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>About Us - Projector Lekki | AV Rental Company in Lagos</title>
        <meta name="description" content="Learn about Projector Lekki - Your trusted AV rental partner in Lekki and Lagos Island. We provide reliable projector rental, sound systems and professional installation services." />
      </Head>

      <Header />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">About Projector Lekki</h1>
        
        <p className="text-lg leading-relaxed mb-8">
          Projector Lekki is a leading AV rental company based in Lekki, Lagos. 
          We specialize in providing high-quality projectors, screens, laptops, LED TVs, speakers, 
          and professional installation services for events, weddings, conferences, churches, 
          and corporate functions across Lagos Island.
        </p>

        <p className="text-lg leading-relaxed mb-8">
          Our mission is to make premium AV equipment accessible and hassle-free for our clients. 
          We handle everything from delivery and setup to pickup, so you can focus on making your 
          event successful.
        </p>

        <div className="bg-white p-8 rounded-2xl shadow mb-10">
          <h2 className="text-2xl font-semibold mb-6">Our Sister Business</h2>
          <p className="text-lg">
            We are also associated with{' '}
            <a 
              href="https://www.projectorrental.com.ng" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              www.projectorrental.com.ng
            </a>, 
            expanding our reach and service offerings across Nigeria.
          </p>
        </div>

        <p className="text-lg leading-relaxed">
          Whether you need a single projector for a meeting or a full AV setup for a large event, 
          Projector Lekki is committed to delivering reliable equipment and excellent service every time.
        </p>
      </div>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}