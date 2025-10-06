// frontend/pages/thank-you.tsx
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ThankYou() {
  return (
    <div>
      <Head>
        <title>Thank You | projector online</title>
        <meta name="description" content="Thank you for your order or booking with projector online." />
        <meta name="keywords" content="projector order confirmation, projector booking confirmation" />
      </Head>
      <Header />
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
        <p>Your order/booking is confirmed.</p>
        <p>Contact us on WhatsApp for support: <a href="https://wa.me/08125146666" className="text-blue-500">Chat</a></p>
        {/* Summary can be fetched via query params or API if needed */}
      </div>
      <Footer />
    </div>
  );
}
