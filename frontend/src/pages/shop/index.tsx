import { GetServerSideProps } from 'next';
import Head from 'next/head';
import ProductCard from '../../components/ProductCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';

interface ShopProps {
  products: Array<{
    id: number;
    name: string;
    description: string;
    price: number;
    slug?: string;
    lumens?: number;
    resolution?: string;
    hdmi?: boolean;
    vga?: boolean;
    [key: string]: any;
  }>;
}

export default function Shop({ products }: ShopProps) {
  return (
    <div>
      <Head>
        <title>Buy Projectors in Lekki | projector online</title>
        <meta
          name="description"
          content="Projectors for sale in Lagos, affordable deals in Lekki"
        />
        <meta
          name="keywords"
          content="buy projector in Lekki, projectors for sale in Lagos, projector deals Lekki"
        />
      </Head>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-10">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id.toString()}
            slug={product.slug || product.id.toString()}
            name={product.name || 'Unknown Projector'}
            // Always use frontend /products/ folder
            image={`/products/${product.slug || product.id.toString()}.jpg`}
            price={product.price ?? 0}
            lumens={product.lumens ?? 2000}
            resolution={product.resolution || '1080p'}
            hdmi={product.hdmi ?? true}
            vga={product.vga ?? false}
            isRental={false}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const rawBase = process.env.NEXT_PUBLIC_BACKEND_URL || '';
  const base = rawBase.replace(/\/+$/, '');
  const API_BASE = `${base}/api`;

  try {
    const res = await axios.get(`${API_BASE}/products/?limit=100`);
    const products = res.data;

    const safeProducts = products.map((p: any) => ({
      ...p,
      created_at: p.created_at ? new Date(p.created_at).toISOString() : null,
      updated_at: p.updated_at ? new Date(p.updated_at).toISOString() : null,
      slug: p.slug || p.id.toString(),
      lumens: p.lumens ?? 2000,
      resolution: p.resolution || '1080p',
      hdmi: p.hdmi ?? true,
      vga: p.vga ?? false,
      price: p.price ?? 0,
    }));

    return { props: { products: safeProducts } };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { props: { products: [] } };
  }
};