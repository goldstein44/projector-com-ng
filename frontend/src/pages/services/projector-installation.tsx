// src/pages/services/projector-installation.tsx
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';

export default function ProjectorInstallation() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Projector & Screen Installation Lekki | Professional Mounting</title>
        <meta name="description" content="Professional projector and screen installation/mounting services in Lekki. Wall mount, ceiling mount for homes, offices, churches and event venues." />
      </Head>

      <Header />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">Projector &amp; Screen Installation</h1>
        <p className="text-3xl font-bold text-blue-600 mb-8">Professional Mounting Services</p>

        <div className="bg-white p-10 rounded-2xl shadow mb-12">
          <h2 className="text-2xl font-semibold mb-6">Our Installation Services Include:</h2>
          <ul className="list-disc pl-6 space-y-4 text-lg">
            <li>Wall mounting for projectors</li>
            <li>Ceiling mounting for projectors</li>
            <li>Screen installation and tensioning</li>
            <li>Cable management and concealment</li>
            <li>Testing and calibration</li>
            <li>Service across Lekki, Ajah, VI, Ikoyi and more</li>
          </ul>
        </div>

        <div className="text-center">
          <a 
            href="https://wa.me/2348125146666" 
            className="inline-block bg-green-500 hover:bg-green-600 text-white text-xl font-bold px-16 py-5 rounded-full"
          >
            Book Installation Service - WhatsApp 08125146666
          </a>
        </div>
      </div>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}