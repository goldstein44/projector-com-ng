// frontend/pages/about.tsx
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div>
      <Head>
        <title>About Us | projector online</title>
        <meta name="description" content="Learn more about projector online, your source for projectors in Lekki." />
        <meta name="keywords" content="about projector online, projector services Lekki" />
      </Head>
      <Header />
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-4">About Us</h1>
        <p>We are a leading provider of projectors for sale and rental in Lekki Ajah, Lagos.</p>
        {/* Add more content */}
      </div>
      <Footer />
    </div>
  );
}