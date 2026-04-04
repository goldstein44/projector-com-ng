// pages/about.tsx
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <>
      <Head>
        <title>About Projector Lekki - AV Rentals in Lagos</title>
        <meta name="description" content="Projector Lekki is your trusted AV rental partner in Lekki, Ajah, Victoria Island, Ikoyi, VGC and surrounding areas. Same-day delivery available." />
      </Head>

      <Header />

      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-10">About Projector Lekki</h1>
        
        <div className="prose max-w-none text-lg text-gray-700">
          <p className="mb-6">
            Projector Lekki is a leading AV rental company serving Lekki, Ajah, Victoria Island, Ikoyi, 
            Banana Island, VGC, Chevron, Sangotedo, Abraham Adesanya, Ikate, Eleganza, Abijo, Jakande and the entire Lagos Island.
          </p>
          
          <p className="mb-6">
            We specialize in professional audio-visual rentals including projectors (HD and normal), 
            projection screens, laptops, LED TVs, and speakers for events, church services, weddings, 
            seminars, corporate presentations, and outdoor functions.
          </p>

          <p className="mb-6">
            Our focus is on reliability, speed, and customer satisfaction. We offer same-day delivery, 
            free basic setup, and we personally handle pickup after your event so you don’t have to worry.
          </p>

          <p>
            Whether you need equipment for a small meeting or a large event, Projector Lekki is here to make 
            your presentation or occasion a success.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}