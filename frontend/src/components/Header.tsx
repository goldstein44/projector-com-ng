// components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span className="text-3xl font-bold tracking-tight text-blue-900">Projector Lekki</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/about" className="hover:text-blue-600">About Us</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          </nav>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/2348125146666"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </header>
  );
}