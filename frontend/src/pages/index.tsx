// src/pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import {
  ChatBubbleBottomCenterIcon,
  CheckIcon,
  TruckIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Projector Lekki - Projector Rental Lekki | Rent Projector in Lekki</title>
        <meta
          name="description"
          content="Projector rental Lekki. Professional AV rentals including projectors, LED screens, interactive whiteboards, interactive flat panels, LED TVs, speakers and installation services."
        />
        <meta
          name="keywords"
          content="projector rental, projector rental lekki, LED screen rental Lekki, interactive whiteboard rental Lekki, AV rental Lekki"
        />
      </Head>

      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Reliable AV Rentals in Lagos Island
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mb-8">
            Projector Lekki
          </p>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            We provide high-quality projectors, LED screens, interactive whiteboards, 
            interactive flat panels, LED TVs, PA speakers and professional installation services.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a
              href="https://wa.me/2348125146666"
              className="inline-block bg-green-500 hover:bg-green-600 text-white text-xl font-bold px-12 py-5 rounded-full shadow-lg"
            >
              WhatsApp 08125146666 Now
            </a>
            <a
              href="#services"
              className="inline-block bg-white hover:bg-gray-100 text-blue-600 text-xl font-bold px-12 py-5 rounded-full shadow-lg"
            >
              See Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Services Section - Highlighted LED Screen and Interactive Whiteboard */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our AV Rental & Installation Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <Link href="/services/projector-rental" className="block">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow hover:shadow-xl transition text-center h-full">
                <div className="flex justify-center mb-6">
                  <Image src="/images/av/hd-projector.jpg" alt="Projector Rental Lekki" width={140} height={140} className="rounded-lg" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Projector Rental</h3>
                <p className="text-gray-600 mb-8">HD and Normal projectors for events, weddings, meetings and church programs.</p>
                <span className="text-blue-600 font-medium">View Details →</span>
              </div>
            </Link>

            <Link href="/services/projector-screen-rental" className="block">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow hover:shadow-xl transition text-center h-full">
                <div className="flex justify-center mb-6">
                  <Image src="/images/av/screen-96.jpg" alt="Projector Screen Rental Lekki" width={140} height={140} className="rounded-lg" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Projector Screen Rental</h3>
                <p className="text-gray-600 mb-8">High quality 6ft x 6ft projection screens.</p>
                <span className="text-blue-600 font-medium">View Details →</span>
              </div>
            </Link>

            {/* Highlighted LED Screen Rental */}
            <Link href="/services/led-screen-rental" className="block">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow hover:shadow-xl transition text-center h-full ring-2 ring-blue-500">
                <div className="flex justify-center mb-6">
                  <Image src="/images/av/led-screen.jpg" alt="LED Screen Rental Lekki" width={140} height={140} className="rounded-lg" />
                </div>
                <h3 className="text-2xl font-bold mb-3">LED Screen Rental</h3>
                <p className="text-gray-600 mb-8">Large bright LED screens for outdoor events, weddings, churches and parties.</p>
                <span className="text-blue-600 font-medium">View Details →</span>
              </div>
            </Link>

            <Link href="/services/led-tv-rental" className="block">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow hover:shadow-xl transition text-center h-full">
                <div className="flex justify-center mb-6">
                  <Image src="/images/av/led-tv.jpg" alt="Smart TV Rental Lekki" width={140} height={140} className="rounded-lg" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Smart TV Rental</h3>
                <p className="text-gray-600 mb-8">Large Smart TVs for bright displays and events.</p>
                <span className="text-blue-600 font-medium">View Details →</span>
              </div>
            </Link>

            <Link href="/services/speakers-rental" className="block">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow hover:shadow-xl transition text-center h-full">
                <div className="flex justify-center mb-6">
                  <Image src="/images/av/speakers.jpg" alt="Speakers Rental Lekki" width={140} height={140} className="rounded-lg" />
                </div>
                <h3 className="text-2xl font-bold mb-3">PA Speakers with Bluetooth</h3>
                <p className="text-gray-600 mb-8">Powerful sound systems with Bluetooth for events.</p>
                <span className="text-blue-600 font-medium">View Details →</span>
              </div>
            </Link>

            <Link href="/services/projector-installation" className="block">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow hover:shadow-xl transition text-center h-full">
                <div className="flex justify-center mb-6">
                  <Image src="/images/av/installation.jpg" alt="Projector Installation Lekki" width={140} height={140} className="rounded-lg" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Projector &amp; Screen Installation</h3>
                <p className="text-gray-600 mb-8">Professional wall and ceiling mounting services.</p>
                <span className="text-blue-600 font-medium">View Details →</span>
              </div>
            </Link>

            {/* Highlighted Interactive Whiteboard / Flat Panel */}
            <Link href="/services/interactive-flat-panel" className="block">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow hover:shadow-xl transition text-center h-full ring-2 ring-blue-500">
                <div className="flex justify-center mb-6">
                  <Image src="/images/av/interactive-screen.jpg" alt="Interactive Flat Panel Lekki" width={140} height={140} className="rounded-lg" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Interactive Whiteboard &amp; Flat Panel</h3>
                <p className="text-gray-600 mb-8">Rental, Sales and Installation of smart interactive boards and flat panels.</p>
                <span className="text-blue-600 font-medium">View Details →</span>
              </div>
            </Link>

            <Link href="/services/projector-sales" className="block">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow hover:shadow-xl transition text-center h-full">
                <div className="flex justify-center mb-6">
                  <Image src="/images/av/hd-projector.jpg" alt="Projector Sales Lekki" width={140} height={140} className="rounded-lg" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Projectors &amp; Screens Sales</h3>
                <p className="text-gray-600 mb-8">Brand new and tokunbo projectors and screens available for purchase.</p>
                <span className="text-blue-600 font-medium">View Details →</span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-12 bg-white border-t border-b">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-6">We Deliver Across Lagos Island</h2>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-blue-600 font-medium">
            <Link href="/projector-rental-lekki" className="hover:underline">Lekki</Link>
            <Link href="/projector-rental-ajah" className="hover:underline">Ajah</Link>
            <Link href="/projector-rental-victoria-island" className="hover:underline">Victoria Island</Link>
            <Link href="/projector-rental-ikoyi" className="hover:underline">Ikoyi</Link>
            <Link href="/projector-rental-vgc" className="hover:underline">VGC</Link>
            <Link href="/projector-rental-salem" className="hover:underline">Salem</Link>
            <Link href="/projector-rental-ibeju" className="hover:underline">Ibeju</Link>
            <Link href="/projector-rental-abijo" className="hover:underline">Abijo</Link>
            <Link href="/projector-rental-jakunde" className="hover:underline">Jakande</Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <ChatBubbleBottomCenterIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">1. Contact Us</h3>
              <p className="text-gray-600">Message us on WhatsApp 08125146666</p>
            </div>
            <div>
              <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <CheckIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">2. We Confirm</h3>
              <p className="text-gray-600">Quick reply with availability and quote</p>
            </div>
            <div>
              <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <TruckIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">3. Delivery &amp; Setup</h3>
              <p className="text-gray-600">We deliver and set up at your location</p>
            </div>
            <div>
              <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <StarIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">4. We Pick Up</h3>
              <p className="text-gray-600">We collect equipment after your event</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}