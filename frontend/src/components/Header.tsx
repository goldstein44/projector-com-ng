// frontend/components/Header.tsx
import Link from 'next/link';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        {/* Logo + Contact Info */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <Link href="/" className="text-3xl font-bold font-['Poppins'] text-blue-300">
            PROJECTOR ONLINE
          </Link>
          <div className="flex flex-col md:flex-row gap-2 text-sm md:text-base">
            <a href="tel:+2348125146666" className="flex items-center gap-1 hover:text-blue-300">
              <PhoneIcon className="w-5 h-5" /> 08125146666
            </a>
            <a href="mailto:projectorlekki@gmail.com" className="flex items-center gap-1 hover:text-blue-300">
              <EnvelopeIcon className="w-5 h-5" /> projectorlekki@gmail.com
            </a>
          </div>
        </div>

        {/* Navigation */}
        <ul className="flex space-x-4 mt-2 md:mt-0">
          <li><Link href="/" className="hover:text-blue-300">Home</Link></li>
          <li><Link href="/about" className="hover:text-blue-300">About Us</Link></li>
          <li><Link href="/contact" className="hover:text-blue-300">Contact Us</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;