// frontend/pages/contact.tsx
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <div>
      <Head>
        <title>Contact Us | projector online</title>
        <meta name="description" content="Get in touch with projector online for projector sales and rentals." />
        <meta name="keywords" content="contact projector online, projector hire Lekki, projector rental Lekki" />
      </Head>
      <Header />
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
        <p>Email: info@projector online</p>
        <p>Phone: +234-XXX-XXXX</p>
        <a href="https://wa.me/08125146666" className="text-blue-500">WhatsApp Us</a>
        {/* Add contact form if needed */}
      </div>
      <Footer />
    </div>
  );
}