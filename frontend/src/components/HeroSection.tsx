// components/HeroSection.tsx
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 text-center">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Projector Lekki
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          AV Rentals – Same-Day Delivery Across Lagos Island
        </h2>
        <p className="text-xl max-w-2xl mx-auto mb-10">
          HD Projector ₦15,000/day • Normal Projector ₦12,000/day • Screen ₦13,000/day • 
          Laptop ₦10,000/day • LED TV ₦20,000/day • Speakers ₦20,000/day
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/2348125146666"
            className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold px-10 py-5 rounded-2xl shadow-lg inline-flex items-center justify-center gap-3"
          >
            WhatsApp 08125146666
          </a>
          <Link
            href="#services"
            className="bg-white text-blue-700 hover:bg-gray-100 text-xl font-bold px-10 py-5 rounded-2xl shadow-lg inline-flex items-center justify-center"
          >
            View All Prices
          </Link>
        </div>
      </div>
    </section>
  );
}