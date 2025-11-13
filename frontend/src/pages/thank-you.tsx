// frontend/src/pages/thank-you.tsx
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ThankYou() {
  return (
    <div>
      <Head>
        <title>Thank You | Projector Online</title>
        <meta name="description" content="Thank you for your order or booking with Projector Online." />
        <meta name="keywords" content="projector order confirmation, projector booking confirmation" />
      </Head>
      <Header />
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
        <p>Your order or booking has been confirmed successfully.</p>
        <p className="mt-2">
          <strong>Note:</strong> For projector sales, delivery takes between <strong>2 to 5 business days</strong> after payment confirmation.
        </p>
        <p className="mt-4">
          Need help? Contact us on WhatsApp:{" "}
          <a href="https://wa.me/08125146666" className="text-blue-500 underline">
            Chat with Support
          </a>
        </p>
        {/* Summary can be fetched via query params or API if needed */}
      </div>
      <Footer />
    </div>
  );
}