// frontend/components/Header.tsx
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="text-3xl font-bold font-['Poppins'] text-blue-300">
          PROJECTOR ONLINE
        </Link>
        <ul className="flex space-x-4">
          <li><Link href="/" className="hover:text-blue-300">Home</Link></li>
          <li><Link href="/about" className="hover:text-blue-300">About Us</Link></li>
          <li><Link href="/contact" className="hover:text-blue-300">Contact Us</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;



