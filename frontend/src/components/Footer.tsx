// frontend/components/Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>{`© ${new Date().getFullYear()} projector.online. All rights reserved.`}</p>
      <p>Website developed by <a href="https://wa.me/+2348125146666" className="text-blue-300">Kyrios Tech Services</a></p>
      <div className="space-x-4 mt-2">
        <a href="/about" className="hover:text-blue-300">About Us</a>
        <a href="/contact" className="hover:text-blue-300">Contact Us</a>
        <a href="/privacy" className="hover:text-blue-300">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;