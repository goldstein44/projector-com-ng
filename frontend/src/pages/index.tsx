// pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import {
  CalendarIcon,
  ChatBubbleBottomCenterIcon,
  StarIcon,
  TruckIcon,
  CheckIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Projector Lekki - AV Rentals in Lekki, Ajah, VI, Ikoyi, VGC</title>
        <meta
          name="description"
          content="Projector rental near me in Lekki, Ajah, Victoria Island, Ikoyi, VGC. HD Projector ₦15,000/day, Normal Projector ₦12,000/day, Screen ₦13,000/day, Laptop ₦10,000/day, LED TV ₦20,000/day, Speakers ₦20,000/day. Same-day delivery available."
        />
        <meta
          name="keywords"
          content="projector rental Lekki, projector hire Lekki, rent projector near me, projector rental Ajah, AV rental Lekki, projector rental Victoria Island, projector rental Ikoyi, projector rental VGC, projector rental Agungi, projector rental Osapa, projector rental Chevron"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Projector Lekki',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Lekki',
                addressRegion: 'Lagos',
                addressCountry: 'NG',
              },
              description: 'Professional AV rentals including projectors, screens, laptops, LED TVs and speakers in Lekki, Ajah and Lagos Island',
              url: 'https://www.projectorlekki.com.ng',
              telephone: '+2348125146666',
              sameAs: 'https://wa.me/2348125146666',
              openingHours: 'Mo-Su 08:00-22:00',
              priceRange: '₦₦',
            }),
          }}
        />
      </Head>

      <Header />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Projector Lekki
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            AV Rentals – Same-Day Delivery Across Lagos Island
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            HD Projector ₦15,000/day • Normal Projector ₦12,000/day • Screen ₦13,000/day • Laptop ₦10,000/day • LED TV ₦20,000/day • Speakers ₦20,000/day
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a
              href="https://wa.me/2348125146666"
              className="inline-block bg-green-500 hover:bg-green-600 text-white text-xl font-bold px-10 py-4 rounded-full shadow-lg"
            >
              WhatsApp 08125146666
            </a>
            <a
              href="#services"
              className="inline-block bg-white hover:bg-gray-100 text-blue-600 text-xl font-bold px-10 py-4 rounded-full shadow-lg"
            >
              View All Prices
            </a>
          </div>
        </div>
      </section>

      {/* AV Rental Services & Prices */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            AV Rental Services & Prices
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow hover:shadow-xl transition text-center">
              <div className="flex justify-center mb-6">
                <Image src="/images/av/hd-projector.jpg" alt="HD Projector Rental Lekki" width={140} height={140} className="rounded-lg" />
              </div>
              <h3 className="text-2xl font-bold mb-3">HD Projector</h3>
              <p className="text-4xl font-bold text-blue-600 mb-2">₦15,000/day</p>
              <p className="text-gray-600 mb-6">High-definition • Bright & clear for any event</p>
              <a href="https://wa.me/2348125146666" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-full">
                Contact Us
              </a>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow hover:shadow-xl transition text-center">
              <div className="flex justify-center mb-6">
                <Image src="/images/av/normal-projector.jpg" alt="Normal Projector Rental Lekki" width={140} height={140} className="rounded-lg" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Normal Projector</h3>
              <p className="text-4xl font-bold text-blue-600 mb-2">₦12,000/day</p>
              <p className="text-gray-600 mb-6">Reliable & affordable • Great everyday use</p>
              <a href="https://wa.me/2348125146666" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-full">
                Contact Us
              </a>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow hover:shadow-xl transition text-center">
              <div className="flex justify-center mb-6">
                <Image src="/images/av/screen-96.jpg" alt="96x96 Screen Rental Lekki" width={140} height={140} className="rounded-lg" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Screen (96"x96")</h3>
              <p className="text-4xl font-bold text-blue-600 mb-2">₦13,000/day</p>
              <p className="text-gray-600 mb-6">Large viewing area • Perfect for presentations</p>
              <a href="https://wa.me/2348125146666" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-full">
                Contact Us
              </a>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow hover:shadow-xl transition text-center">
              <div className="flex justify-center mb-6">
                <Image src="/images/av/laptop.jpg" alt="Laptop Rental Lekki" width={140} height={140} className="rounded-lg" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Laptop</h3>
              <p className="text-4xl font-bold text-blue-600 mb-2">₦10,000/day</p>
              <p className="text-gray-600 mb-6">High-performance • Ready for presentations</p>
              <a href="https://wa.me/2348125146666" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-full">
                Contact Us
              </a>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow hover:shadow-xl transition text-center">
              <div className="flex justify-center mb-6">
                <Image src="/images/av/led-tv.jpg" alt="LED TV Rental Lekki" width={140} height={140} className="rounded-lg" />
              </div>
              <h3 className="text-2xl font-bold mb-3">LED TV</h3>
              <p className="text-4xl font-bold text-blue-600 mb-2">₦20,000/day</p>
              <p className="text-gray-600 mb-6">Large screen alternative • Sharp & vibrant</p>
              <a href="https://wa.me/2348125146666" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-full">
                Contact Us
              </a>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow hover:shadow-xl transition text-center">
              <div className="flex justify-center mb-6">
                <Image src="/images/av/speakers.jpg" alt="Speakers Rental Lekki" width={140} height={140} className="rounded-lg" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Speakers</h3>
              <p className="text-4xl font-bold text-blue-600 mb-2">₦20,000/day</p>
              <p className="text-gray-600 mb-6">Powerful sound • Ideal for events & gatherings</p>
              <a href="https://wa.me/2348125146666" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-full">
                Contact Us
              </a>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mt-12 text-center text-lg font-medium text-gray-800">
            <p className="text-2xl mb-4">Only Delivery Available 🚚</p>
            <p className="mb-2">Payment on delivery</p>
            <p className="mb-4">Setup free</p>
            <p className="text-xl">Call/WhatsApp: 08125146666</p>
          </div>
        </div>
      </section>

      {/* Internal Links - Strong On-Page SEO */}
      <section className="py-12 bg-white border-t border-b">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-6">We Deliver Across Lagos Island</h2>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-blue-600 font-medium">
            <Link href="/projector-rental-lekki" className="hover:underline">Lekki Phase 1 & 2</Link>
            <Link href="/projector-rental-ajah" className="hover:underline">Ajah & Sangotedo</Link>
            <Link href="/projector-rental-victoria-island" className="hover:underline">Victoria Island</Link>
            <Link href="/projector-rental-ikoyi" className="hover:underline">Ikoyi & Banana Island</Link>
            <Link href="/projector-rental-vgc" className="hover:underline">VGC & Chevron</Link>
            <Link href="/projector-rental-near-me" className="hover:underline">Projector Rental Near Me</Link>
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
              <h3 className="text-xl font-bold mb-4">1. Contact Us on WhatsApp</h3>
              <p className="text-gray-600">Message 08125146666 and tell us what you need based on your event.</p>
            </div>
            <div>
              <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <CheckIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">2. We Confirm & Quote</h3>
              <p className="text-gray-600">We reply quickly with availability and quote.</p>
            </div>
            <div>
              <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <TruckIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">3. We Deliver & Set Up</h3>
              <p className="text-gray-600">Same-day delivery to your location. Pay after delivery & setup.</p>
            </div>
            <div>
              <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <StarIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">4. We Pick Up After Event</h3>
              <p className="text-gray-600">We collect the equipment after your event.</p>
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