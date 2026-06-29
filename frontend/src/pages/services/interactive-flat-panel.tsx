// src/pages/services/interactive-flat-panel.tsx
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';

export default function InteractiveFlatPanel() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Interactive Whiteboard & Flat Panel Rental, Sales & Installation Lekki</title>
        <meta 
          name="description" 
          content="Rent, buy and install interactive whiteboards and smart flat panels in Lekki, Jakande, Ajah and Lagos Island. Perfect for schools, offices, churches and training centers." 
        />
      </Head>

      <Header />

      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">Interactive Whiteboard &amp; Flat Panel</h1>
        <p className="text-3xl font-semibold text-blue-600 mb-10">
          Rental • Sales • Installation
        </p>

        <div className="prose max-w-none text-lg leading-relaxed mb-12">
          <p>
            Modern interactive displays and smart boards for education, corporate training, 
            churches, conference rooms and collaborative workspaces in Lekki and Lagos Island.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-4">Rental</h3>
            <p className="text-gray-600">
              Short or long-term rental of latest interactive flat panels and whiteboards with touch functionality.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-4">Sales</h3>
            <p className="text-gray-600">
              Brand new and high-quality interactive screens available for outright purchase with warranty.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-4">Installation</h3>
            <p className="text-gray-600">
              Professional wall mounting, ceiling mounting, calibration and full setup service.
            </p>
          </div>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow mb-12">
          <h2 className="text-2xl font-semibold mb-6">Perfect For:</h2>
          <ul className="list-disc pl-6 space-y-3 text-lg">
            <li>Schools and educational institutions</li>
            <li>Corporate training rooms and offices</li>
            <li>Churches and places of worship</li>
            <li>Conference halls and event centers</li>
            <li>Collaborative workspaces</li>
          </ul>
        </div>

        <div className="text-center">
          <a 
            href="https://wa.me/2348125146666" 
            className="inline-block bg-green-500 hover:bg-green-600 text-white text-xl font-bold px-16 py-5 rounded-full"
          >
            Get Quote for Interactive Screen - WhatsApp 08125146666
          </a>
        </div>
      </div>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}