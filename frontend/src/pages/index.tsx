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
          content="Projector rental Lekki, rent projector Lekki. Professional AV rentals including projectors, screens, laptops, LED TVs, speakers and projector & screen installation. Same-day delivery available."
        />
        <meta
          name="keywords"
          content="projector rental, projector rental lekki, rent projector lekki, projector hire Lekki, projector installation Lekki, screen mounting Lekki, AV rental Lekki, rent projector near me"
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
            Get Your Event Equipment Delivered &amp; Set Up Today
          </p>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Professional projectors, large screens, laptops, LED TVs, speakers and expert installation services. 
            <span className="font-bold">Same-day delivery • Free basic setup • We pick up after your event.</span>
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

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our AV Rental & Installation Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Grouped Projectors */}
            <Link href="/services/projector-rental" className="block">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow hover:shadow-xl transition text-center h-full">
                <div className="flex justify-center mb-6">
                  <Image src="/images/av/hd-projector.jpg" alt="Projector Rental Lekki" width={140} height={140} className="rounded-lg" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Projector Rental</h3>
                <p className="text-4xl font-bold text-blue-600 mb-2">From ₦12,000/day</p>
                <p className="text-gray-600 mb-6">HD Projectors &amp; Normal Projectors for events, meetings, weddings and churches</p>
                <span className="text-blue-600 font-medium">View Details →</span>
              </div>
            </Link>

            {/* Other Services */}
            <Link href="/services/projector-screen-rental" className="block">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow hover:shadow-xl transition text-center h-full">
                <div className="flex justify-center mb-6">
                  <Image src="/images/av/screen-96.jpg" alt="Projector Screen Rental Lekki" width={140} height={140} className="rounded-lg" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Projector Screen Rental</h3>
                <p className="text-4xl font-bold text-blue-600 mb-2">₦13,000/day</p>
                <p className="text-gray-600 mb-6">96"x96" High Quality Projection Screens</p>
                <span className="text-blue-600 font-medium">View Details →</span>
              </div>
            </Link>

            <Link href="/services/laptop-rental" className="block">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow hover:shadow-xl transition text-center h-full">
                <div className="flex justify-center mb-6">
                  <Image src="/images/av/laptop.jpg" alt="Laptop Rental Lekki" width={140} height={140} className="rounded-lg" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Laptop Rental</h3>
                <p className="text-4xl font-bold text-blue-600 mb-2">₦10,000/day</p>
                <p className="text-gray-600 mb-6">High-performance laptops for presentations</p>
                <span className="text-blue-600 font-medium">View Details →</span>
              </div>
            </Link>

            <Link href="/services/led-tv-rental" className="block">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow hover:shadow-xl transition text-center h-full">
                <div className="flex justify-center mb-6">
                  <Image src="/images/av/led-tv.jpg" alt="LED TV Rental Lekki" width={140} height={140} className="rounded-lg" />
                </div>
                <h3 className="text-2xl font-bold mb-3">LED TV Rental</h3>
                <p className="text-4xl font-bold text-blue-600 mb-2">₦20,000/day</p>
                <p className="text-gray-600 mb-6">Large LED TVs for events and displays</p>
                <span className="text-blue-600 font-medium">View Details →</span>
              </div>
            </Link>

            <Link href="/services/speakers-rental" className="block">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow hover:shadow-xl transition text-center h-full">
                <div className="flex justify-center mb-6">
                  <Image src="/images/av/speakers.jpg" alt="Speakers Rental Lekki" width={140} height={140} className="rounded-lg" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Speakers Rental</h3>
                <p className="text-4xl font-bold text-blue-600 mb-2">₦20,000/day</p>
                <p className="text-gray-600 mb-6">Powerful sound systems for events</p>
                <span className="text-blue-600 font-medium">View Details →</span>
              </div>
            </Link>

            <Link href="/services/projector-installation" className="block">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow hover:shadow-xl transition text-center h-full">
                <div className="flex justify-center mb-6">
                  <Image src="/images/av/installation.jpg" alt="Projector Installation Lekki" width={140} height={140} className="rounded-lg" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Projector &amp; Screen Installation</h3>
                <p className="text-4xl font-bold text-blue-600 mb-2">Professional Mounting</p>
                <p className="text-gray-600 mb-6">Expert wall &amp; ceiling mounting for projectors and screens</p>
                <span className="text-blue-600 font-medium">View Details →</span>
              </div>
            </Link>
          </div>

          <div className="mt-12 text-center text-lg font-medium text-gray-800">
            <p className="text-2xl mb-4">Only Delivery Available 🚚</p>
            <p className="mb-2">Payment on delivery • Setup free</p>
            <p className="text-xl">Call/WhatsApp: 08125146666</p>
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

      {/* FAQ Section */}
      <section className="p-10 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-8">
            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">How much does AV rental cost?</h3>
              <p className="text-gray-700">HD &amp; Normal Projectors from ₦12,000/day, Screen ₦13,000/day, Laptop ₦10,000/day, LED TV ₦20,000/day, Speakers ₦20,000/day. Installation services also available.</p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">Do you offer same-day delivery?</h3>
              <p className="text-gray-700">Yes, same-day delivery in Lekki, Ajah, Victoria Island, Ikoyi, VGC, Salem, Ibeju, Abijo and surrounding areas.</p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">How does the rental process work?</h3>
              <p className="text-gray-700">Contact us on WhatsApp → We confirm availability → We deliver and set up → You pay after setup → We pick up after your event.</p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">Do you install projectors and screens?</h3>
              <p className="text-gray-700">Yes, we offer professional projector and screen installation/mounting services.</p>
            </div>

            <div className="border-b pb-6">
              <h3 className="text-xl font-bold mb-3">Do I need to return the equipment myself?</h3>
              <p className="text-gray-700">No. We handle delivery and pickup.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="p-10 bg-blue-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Rent AV Equipment?</h2>
        <p className="mb-6">Same-day delivery available across Lagos Island.</p>
        <div className="flex justify-center gap-4">
          <a href="https://wa.me/2348125146666" className="bg-white text-blue-500 px-8 py-3 rounded hover:bg-gray-100 font-bold">
            WhatsApp 08125146666
          </a>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}