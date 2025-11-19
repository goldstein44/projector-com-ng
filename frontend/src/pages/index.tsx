import { GetServerSideProps } from 'next';
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
} from '@heroicons/react/24/outline';
import axios from 'axios';
import { useState } from 'react';

interface HomeProps {
  featuredProducts: Array<{
    id: string;
    name: string;
    slug: string;
    image: string;
    price: number;
    condition?: 'brand_new' | 'tokunbo';
    [key: string]: any;
  }>;
  featuredRentals: Array<{
    id: string;
    name: string;
    slug: string;
    image: string;
    price_per_day: number;
    [key: string]: any;
  }>;
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
            👉 Rent today or buy outright — Zero Hassle. Zero Risk.
          </p>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <Link href="/rental">
            <button className="bg-white text-blue-500 px-6 py-2 rounded hover:bg-gray-100 font-semibold">
              Rent Now
            </button>
          </Link>
          <Link href="/shop">
            <button className="bg-white text-blue-500 px-6 py-2 rounded hover:bg-gray-100 font-semibold">
              Buy Now
            </button>
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
                  src={product.image || '/images/placeholder.jpg'}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{`₦${product.price}`}</p>
                {product.condition && (
                  <p className="text-sm text-gray-500 capitalize">
                    {product.condition.replace('_', ' ')}
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
                  src={rental.image || '/images/placeholder.jpg'}
                  alt={rental.name}
                  width={300}
                  height={200}
                  className="rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold">{rental.name}</h3>
                <p className="text-gray-600">{`₦${rental.price_per_day}/day`}</p>
                <Link
                  href={`/rental/${rental.slug}`}
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
          <Link href="/rental">
            <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 font-semibold">
              Book Online
            </button>
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
          <Link href="/shop">
            <button className="bg-white text-blue-500 px-6 py-2 rounded hover:bg-gray-100">
              Shop Now
            </button>
          </Link>
          <Link href="/rental">
            <button className="bg-white text-blue-500 px-6 py-2 rounded hover:bg-gray-100">
              Rent Now
            </button>
          </Link>
          <a href="https://wa.me/2348125146666">
            <button className="bg-white text-blue-500 px-6 py-2 rounded hover:bg-gray-100">
              Contact Us
            </button>
          </a>
        </div>
      </section>

      <Footer />

      {/* Floating WhatsApp button (always visible on this page) */}
      <FloatingWhatsApp />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const rawBase = process.env.NEXT_PUBLIC_BACKEND_URL || '';
  const base = rawBase.replace(/\/+$/, '');
  const API_BASE = `${base}/api`;

  let featuredProducts: any[] = [];
  let featuredRentals: any[] = [];

  try {
    const productRes = await axios.get(`${API_BASE}/products/?limit=3`);
    featuredProducts = productRes.data.map((p: any) => ({
      ...p,
      created_at: p.created_at ? new Date(p.created_at).toISOString() : null,
      updated_at: p.updated_at ? new Date(p.updated_at).toISOString() : null,
    }));
  } catch (error) {
    console.error('Failed to fetch products:', error);
    featuredProducts = [];
  }

  try {
    const rentalRes = await axios.get(`${API_BASE}/rentals/?limit=3`);
    featuredRentals = rentalRes.data.map((r: any) => ({
      ...r,
      created_at: r.created_at ? new Date(r.created_at).toISOString() : null,
      updated_at: r.updated_at ? new Date(r.updated_at).toISOString() : null,
    }));
  } catch (error) {
    console.error('Failed to fetch rentals:', error);
    featuredRentals = [];
  }

  return {
    props: {
      featuredProducts,
      featuredRentals,
    },
  };
};