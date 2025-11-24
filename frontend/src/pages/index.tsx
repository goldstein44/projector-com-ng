// src/pages/index.tsx
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import HeroSection from '../components/HeroSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import {
  ShoppingCartIcon,
  CalendarIcon,
  ChatBubbleBottomCenterIcon,
  StarIcon,
  TruckIcon,
  CheckIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import fs from 'fs';
import path from 'path';

interface Product {
  id: string;
  slug: string;
  brand: string;
  model: string;
  price: number;
  condition: 'brand_new' | 'tokunbo';
  image: string;
}

interface Rental {
  id: string;
  slug: string;
  brand: string;
  model: string;
  price_per_day: number;
  image: string;
}

interface HomeProps {
  featuredProducts: Product[];
  featuredRentals: Rental[];
}

export default function Home({ featuredProducts, featuredRentals }: HomeProps) {
  const [filter, setFilter] = useState<'all' | 'brand_new' | 'tokunbo'>('all');

  const filteredProducts =
    filter === 'all'
      ? featuredProducts
      : featuredProducts.filter((product) => product.condition === filter);

  return (
    <div>
      <Head>
        <title>Projector online - Buy or Rent Projectors in Lekki Ajah</title>
        <meta
          name="description"
          content="Affordable projectors for sale and hire in Lekki, Lagos. Keywords: buy projector in Lekki, projector hire Lekki, projector rental Lekki, projectors for sale in Lagos, affordable projector hire near me, projector deals Lekki"
        />
        <meta
          name="keywords"
          content="buy projector in Lekki, projector hire Lekki, projector rental Lekki, projectors for sale in Lagos, affordable projector hire near me, projector deals Lekki"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Projector online',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Lekki',
                addressRegion: 'Lagos',
                addressCountry: 'NG',
              },
              description: 'Projectors for sale and rental in Lekki',
            }),
          }}
        />
      </Head>
      <Header />
      <HeroSection />

      {/* Irresistible Offer Section */}
      <section className="p-10 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">
          Bright, Reliable Projectors – Delivered Exactly When You Need Them.
        </h2>
        <h3 className="text-xl font-medium mb-6 max-w-3xl mx-auto">
          Projector online makes it effortless to rent or buy projectors in Lekki
          Ajah. With same-day delivery, professional services, and one-click
          WhatsApp or Online booking, we take the hassle out of getting the right projector — 
          so your event, church service, or presentation always shines bright.
        </h3>

        <div className="max-w-2xl mx-auto space-y-4 text-left">
          <div className="flex items-center gap-2">
            <CheckIcon className="w-6 h-6 text-green-300" />
            <p>Same-day delivery in Lekki/Ajah</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="w-6 h-6 text-green-300" />
            <p>
              All projectors tested before delivery — guaranteed working. No “dim
              light” surprises – only bright, high-quality projectors.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="w-6 h-6 text-green-300" />
            <p>Risk-free: If it fails, you don’t pay</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="w-6 h-6 text-green-300" />
            <p>One-click WhatsApp or Online booking, reply within 5 mins or ₦1,000 off</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="w-6 h-6 text-green-300" />
            <p>Free pickup after your event for rentals</p>
          </div>

          {/* Updated Pricing Structure */}
          <div className="mt-6 space-y-2">
            <p className="text-xl font-bold">Rental Pricing:</p>
            <p>1 day – ₦15,000</p>
            <p>2–3 days – ₦13,500/day</p>
            <p>4–6 days – ₦12,000/day</p>
            <p>7+ days – ₦10,000/day</p>
          </div>
          <p className="text-2xl font-semibold mt-4">
            Rent today or buy outright — Zero Hassle. Zero Risk.
          </p>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <Link href="/rental" className="bg-white text-blue-500 px-6 py-2 rounded hover:bg-gray-100 font-semibold">
            Rent Now
          </Link>
          <Link href="/shop" className="bg-white text-blue-500 px-6 py-2 rounded hover:bg-gray-100 font-semibold">
            Buy Now
          </Link>
          <a href="https://wa.me/2348125146666" aria-label="WhatsApp us">
            <button className="bg-white text-blue-500 px-6 py-2 rounded hover:bg-gray-100 font-semibold">
              WhatsApp Us
            </button>
          </a>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="p-10 bg-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <div className="flex items-start gap-4">
              <ShoppingCartIcon className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-xl font-semibold">Buy a Projector</h3>
                <p>Browse our selection, add to cart, checkout, and pay securely.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CalendarIcon className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-xl font-semibold">Rent a Projector</h3>
                <p>Choose your dates, check availability, book, and pay.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ChatBubbleBottomCenterIcon className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-xl font-semibold">Need Help?</h3>
                <p>
                  Contact us on WhatsApp:{' '}
                  <a
                    href="https://wa.me/2348125146666"
                    className="text-blue-500 hover:underline"
                  >
                    Chat Now
                  </a>
                </p>
              </div>
            </div>
            <p className="text-lg">Rental Pricing: Starting at ₦15,000/day</p>
          </div>
          <div className="flex-1">
            <Image
              src="/images/projector.jpg"
              alt="High-quality projector for sale or rent"
              width={400}
              height={300}
              className="rounded-lg shadow-md"
              priority
            />
          </div>
        </div>
      </section>

      {/* NEW: Location Coverage Section – SEO DOMINATION */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <MapPinIcon className="w-10 h-10 text-blue-600" />
            <h2 className="text-4xl font-bold text-gray-900">We Deliver Across Lagos Island</h2>
          </div>
          <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
            Same-day projector rental & sales in Lekki, Ajah, Victoria Island, Ikoyi, VGC and all premium estates.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-lg">
            <div>
              <Link href="/projector-rental-lekki" className="block font-semibold text-blue-600 hover:text-blue-800 hover:underline">
                Lekki Phase 1 & 2
              </Link>
            </div>
            <div>
              <Link href="/projector-rental-ajah" className="block font-semibold text-blue-600 hover:text-blue-800 hover:underline">
                Ajah & Sangotedo
              </Link>
            </div>
            <div>
              <Link href="/projector-rental-victoria-island" className="block font-semibold text-blue-600 hover:text-blue-800 hover:underline">
                Victoria Island (VI)
              </Link>
            </div>
            <div>
              <Link href="/projector-rental-ikoyi" className="block font-semibold text-blue-600 hover:text-blue-800 hover:underline">
                Ikoyi & Banana Island
              </Link>
            </div>
            <div>
              <Link href="/projector-rental-vgc" className="block font-semibold text-blue-600 hover:text-blue-800 hover:underline">
                VGC & Chevron
              </Link>
            </div>
          </div>

          <p className="mt-10 text-gray-600">
            Serving Osapa, Ikate, Agungi, Abraham Adesanya, Ikota, Oniru, Eko Atlantic, Parkview and more.
          </p>
        </div>
      </section>

      {/* Featured Products Section with Dropdown Filter */}
      <section className="p-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Featured Projectors for Sale</h2>
          <div>
            <select
              data-testid="condition-filter"
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as 'all' | 'brand_new' | 'tokunbo')
              }
              className="border border-gray-300 rounded-md px-3 py-2 text-gray-700"
            >
              <option value="all">All</option>
              <option value="brand_new">Brand New</option>
              <option value="tokunbo">Tokunbo</option>
            </select>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
              >
                <Image
                  src={product.image}
                  alt={`${product.brand} ${product.model}`}
                  width={300}
                  height={200}
                  className="rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold">{product.brand} {product.model}</h3>
                <p className="text-gray-600">{`₦${product.price.toLocaleString()}`}</p>
                {product.condition && (
                  <p className="text-sm text-gray-500 capitalize">
                    {String(product.condition).replace('_', ' ')}
                  </p>
                )}
                <Link
                  href={`/shop/${product.slug}`}
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No featured products available at the moment.
          </p>
        )}
        <div className="text-center mt-6">
          <Link
            href="/shop"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Shop All Projectors
          </Link>
        </div>
      </section>

      {/* Featured Rentals Section */}
      <section className="p-10 bg-gray-50">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Featured Projectors for Rent
        </h2>
        {featuredRentals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredRentals.map((rental) => (
              <div
                key={rental.id}
                className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
              >
                <Image
                  src={rental.image}
                  alt={`${rental.brand} ${rental.model}`}
                  width={300}
                  height={200}
                  className="rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold">{rental.brand} {rental.model}</h3>
                <p className="text-gray-600">{`₦${rental.price_per_day.toLocaleString()}/day`}</p>
                {/* Updated to booking page */}
                <Link
                  href={`/booking?projectorId=${rental.id}`}
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No featured rentals available at the moment.
          </p>
        )}
        <div className="text-center mt-6">
          <Link
            href="/rental"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Explore All Rentals
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="p-10 bg-white">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Why Choose Projector online?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <StarIcon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">High Quality</h3>
            <p>Top-brand projectors with excellent performance for all your needs.</p>
          </div>
          <div className="text-center">
            <TruckIcon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Trusted by Event Planners</h3>
            <p>We’ve powered events, churches, and offices across Lekki with reliable gear.</p>
          </div>
          <div className="text-center">
            <ChatBubbleBottomCenterIcon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">24/7 Support</h3>
            <p>Reach us anytime via WhatsApp for assistance.</p>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <a href="https://wa.me/2348125146666">
            <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 font-semibold">
              Book on WhatsApp
            </button>
          </a>
          <Link href="/rental" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 font-semibold">
            Book Online
          </Link>
          <a href="tel:+2348125146666">
            <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 font-semibold">
              Call Us to Book
            </button>
          </a>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="p-10 bg-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-center">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6 shadow-md">
            <p className="italic">
              "Rented a projector for our event, and it was seamless! Great service!"
            </p>
            <p className="mt-2 font-semibold">– Tolu A., Lagos</p>
          </div>
          <div className="border rounded-lg p-6 shadow-md">
            <p className="italic">
              "Bought a projector for my office. Excellent quality and fast delivery."
            </p>
            <p className="mt-2 font-semibold">– Chidi O., Lekki</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="p-10 bg-blue-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-6">
          Browse our projectors or contact us for personalized assistance.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/shop" className="bg-white text-blue-500 px-6 py-2 rounded hover:bg-gray-100">
            Shop Now
          </Link>
          <Link href="/rental" className="bg-white text-blue-500 px-6 py-2 rounded hover:bg-gray-100">
            Rent Now
          </Link>
          <a href="https://wa.me/2348125146666">
            <button className="bg-white text-blue-500 px-6 py-2 rounded hover:bg-gray-100">
              Contact Us
            </button>
          </a>
        </div>
      </section>

      <Footer />

      {/* Floating WhatsApp button */}
      <FloatingWhatsApp />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const DATA_FILE = path.join(process.cwd(), 'data', 'projectors.json');

  let data = { sales: [], rentals: [] };
  if (fs.existsSync(DATA_FILE)) {
    try {
      data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    } catch (e) {
      console.error('Error reading projectors.json');
    }
  }

  // ✅ Use the actual image path from JSON
  const featuredProducts = (data.sales || [])
    .slice(0, 6)
    .map((p: any) => ({
      id: p.id,
      slug: p.slug,
      brand: p.brand,
      model: p.model,
      price: p.price,
      condition: p.condition,
      image: p.image || '/placeholder.jpg',
    }));

  const featuredRentals = (data.rentals || [])
    .slice(0, 6)
    .map((r: any) => ({
      id: r.id,
      slug: r.slug,
      brand: r.brand,
      model: r.model,
      price_per_day: r.price_per_day,
      image: r.image || '/placeholder.jpg',
    }));

  return {
    props: {
      featuredProducts,
      featuredRentals,
    },
    revalidate: 60,
  };
};