// frontend/components/HeroSection.tsx
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="bg-blue-500 text-white p-10 text-center">
      <h1 className="text-4xl font-bold mb-4">Projectors in Lekki-Ajah</h1>
      <p className="mb-6">Buy or Rent High-Quality Projectors</p>
      <div className="space-x-4">
        <Link href="/shop" className="bg-white text-blue-500 px-4 py-2 rounded">Buy a Projector</Link>
        <Link href="/rental" className="bg-white text-blue-500 px-4 py-2 rounded">Rent a Projector</Link>
      </div>
    </section>
  );
};

export default HeroSection;



