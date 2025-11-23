import { GetStaticProps } from 'next';
import Head from 'next/head';
import ProductCard from '../../components/ProductCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import fs from 'fs';
import path from 'path';

interface Product {
  id: string;
  slug: string;
  brand: string;
  model: string;
  price: number;
  lumens: number;
  resolution: string;
  hdmi: boolean;
  vga: boolean;
  condition: 'brand_new' | 'tokunbo';
  description: string;
}

interface ShopProps {
  products: Product[];
}

export default function Shop({ products }: ShopProps) {
  return (
    <div>
      <Head>
        <title>Buy Projectors in Lekki | Projector online</title>
        <meta
          name="description"
          content="Brand new & tokunbo projectors for sale in Lekki, Lagos. Same-day delivery. Full specs, real photos, trusted quality."
        />
        <meta
          name="keywords"
          content="buy projector in Lekki, projectors for sale in Lagos, Epson projector Lagos, tokunbo projector Lekki, 4K projector Nigeria"
        />
      </Head>

      <Header />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-10 text-blue-900">
          Projectors for Sale in Lekki
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Brand new and carefully selected tokunbo projectors. All tested, bright, and ready for home, office, church, or event use.
        </p>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                name={`${product.brand} ${product.model}`}
                image={`/products/${product.slug}.jpg`}
                price={product.price}
                lumens={product.lumens}
                resolution={product.resolution}
                hdmi={product.hdmi}
                vga={product.vga}
                condition={product.condition}
                description={product.description}
                isRental={false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-xl">
            <p className="text-2xl text-gray-600">No projectors available for sale right now.</p>
            <p className="text-lg text-gray-500 mt-4">Check back soon — new stock arriving daily!</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const dataFile = path.join(process.cwd(), 'data', 'projectors.json');

  let products: Product[] = [];

  if (fs.existsSync(dataFile)) {
    try {
      const rawData = fs.readFileSync(dataFile, 'utf-8');
      const jsonData = JSON.parse(rawData);

      products = (jsonData.sales || []).map((item: any) => ({
        id: item.id,
        slug: item.slug,
        brand: item.brand,
        model: item.model,
        price: item.price,
        lumens: item.lumens || 0,
        resolution: item.resolution || 'Unknown',
        hdmi: item.hdmi ?? true,
        vga: item.vga ?? false,
        condition: item.condition || 'tokunbo',
        description: item.description || '',
      }));
    } catch (error) {
      console.error('Error reading projectors.json:', error);
    }
  }

  return {
    props: {
      products,
    },
    revalidate: 60, // Refresh every minute when you add/delete from admin
  };
};