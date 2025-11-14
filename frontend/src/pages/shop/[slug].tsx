// frontend/src/pages/shop/[slug].tsx
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';
import React, { useContext } from 'react';
import { CartContext } from '../../../context/CartContext'; // <- named import of context object

// derive type from context
type CartContextType = React.ContextType<typeof CartContext>;

interface ProductDetailProps {
  product: {
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
  };
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const context = useContext(CartContext) as CartContextType | undefined;

  if (!context) {
    throw new Error('ProductDetail must be used within a CartProvider');
  }

  const { addItem } = context;

  const handleAddToCart = () => {
    addItem({ id: product.id, name: product.name, price: product.price, quantity: 1 });
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
            __html: `
          {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": "${product.name}",
            "image": "${product.image || '/placeholder.jpg'}",
            "description": "${product.description}",
            "brand": "${product.brand || ''}",
            "offers": {
              "@type": "Offer",
              "url": "https://projector.online/shop/${product.slug}",
              "priceCurrency": "NGN",
              "price": "${product.price}",
              "availability": "${
                product.is_available ? 'InStock' : 'OutOfStock'
              }"
            }
          }
        `,
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
        <p>₦{product.price}</p>
        <p>{product.description}</p>
        <p>
          Lumens: {product.lumens} | Resolution: {product.resolution}
        </p>
        <p>
          HDMI: {product.hdmi ? 'Yes' : 'No'} | VGA: {product.vga ? 'Yes' : 'No'}
        </p>
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

export const getServerSideProps: GetServerSideProps<ProductDetailProps> = async ({
  params,
}) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}products/${params?.slug}/`
  );
  const product = res.data;

  return { props: { product } };
};