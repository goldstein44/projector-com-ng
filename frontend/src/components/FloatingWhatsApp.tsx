// frontend/components/FloatingWhatsApp.tsx
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/2348125146666"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center z-50 transition"
    >
      <FaWhatsapp className="w-6 h-6" />
    </a>
  );
};

export default FloatingWhatsApp;