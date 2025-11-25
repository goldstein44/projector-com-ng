// frontend/src/pages/shop/[slug].tsx

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import React, { useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../../../context/CartContext';
import type { GetServerSidePropsContext } from 'next';

type CartContextType = React.ContextType<typeof CartContext>;

interface Product {
  id: string;
  name: string;
  description: string;
  slug: string;
  price: number;
  image?: string;
  brand?: string;
  lumens?: number;
  resolution?: string;
  hdmi?: boolean;
  vga?: boolean;
  is_available?: boolean;
}

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const context = useContext(CartContext) as CartContextType | undefined;

  if (!context) {
    throw new Error('ProductDetail must be used within a CartProvider');
  }

  const { addItem } = context;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  };

  return (
    <div>
      <Head>
        <title>{product.name} for Sale in Lekki | projector.online</title>
        <meta name="description" content={product.description} />
        <meta
          name="keywords"
          content={`buy ${product.name}, projector deals Lekki, projectors for sale in Lagos`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name: product.name,
              image: product.image || '/placeholder.jpg',
              description: product.description,
              brand: product.brand || '',
              offers: {
                "@type": "Offer",
                url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/shop/${product.slug}`,
                priceCurrency: 'NGN',
                price: String(product.price),
                availability: product.is_available ? 'InStock' : 'OutOfStock',
              },
            }),
          }}
        />
      </Head>

      <Header />

      <div className="p-10">
        <Image
          src={product.image || '/placeholder.jpg'}
          alt={product.name}
          width={500}
          height={300}
        />

        <h1 className="text-2xl font-bold">{product.name}</h1>

        <p>{`₦${product.price}`}</p>
        <p>{product.description}</p>

        <p>
          {`Lumens: ${product.lumens ?? 'N/A'} | Resolution: ${product.resolution ?? 'N/A'}`}
        </p>

        <p>{`HDMI: ${product.hdmi ? 'Yes' : 'No'} | VGA: ${product.vga ? 'Yes' : 'No'}`}</p>

        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 mt-4"
          data-testid="add-to-cart-button"
        >
          Add to Cart
        </button>

        <div className="mt-4">
          <h2>Reviews</h2>
          <p>No reviews yet.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

/**
 * Server-side fetch: build a safe absolute URL to call our internal API.
 * - Prefer NEXT_PUBLIC_SITE_URL when present (set this on Vercel).
 * - Otherwise build from incoming request headers (works in dev).
 */
export const getServerSideProps: GetServerSideProps<ProductDetailProps> = async (
  context: GetServerSidePropsContext
) => {
  const { params, req } = context;
  const slug = params?.slug;

  if (!slug || Array.isArray(slug)) {
    return { notFound: true };
  }

  try {
    // 1) prefer explicit env var (set this on Vercel)
    let baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

    // 2) fallback: construct from request (dev and many hosting environments)
    if (!baseUrl) {
      // x-forwarded-proto is set by many proxies (vercel, nginx, etc.)
      const protoHeader = req.headers['x-forwarded-proto'] as string | undefined;
      const protocol = protoHeader ? protoHeader.split(',')[0] : (req.headers['referer']?.startsWith('https') ? 'https' : 'http');
      const host = req.headers.host;
      if (!host) {
        throw new Error('Could not determine host for server-side request');
      }
      baseUrl = `${protocol}://${host}`;
    }

    // ensure no double slashes
    baseUrl = baseUrl.replace(/\/+$/, '');

    const url = `${baseUrl}/api/products/${encodeURIComponent(slug)}`;

    // axios requires an absolute URL on the server
    const res = await axios.get(url, { timeout: 8000 });

    // If your API returns { error } or similar, check and handle
    if (!res.data) {
      return { notFound: true };
    }

    const product: Product = res.data;

    return {
      props: {
        product,
      },
    };
  } catch (err) {
    console.error('Product page error:', err);
    // show 404 instead of 500 to avoid exposing errors to users
    return { notFound: true };
  }
};