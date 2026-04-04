// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-xl mb-4">Projector Lekki</h3>
            <p className="text-sm">AV Rentals &amp; Projector Sales</p>
            <p className="text-sm mt-2">Lagos Island</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/rental" className="hover:text-white">Rentals</Link></li>
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-6">
              <a href="https://instagram.com/projectorlekki" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Instagram
              </a>
              <a href="https://facebook.com/projectorlekki" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Facebook
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <p className="text-sm">WhatsApp: 08125146666</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          © {new Date().getFullYear()} Projector Lekki. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}