// frontend/components/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  image?: string;       // optional, fallback will be used
  price?: number;       // optional, defaults handled
  pricePerDay?: number; // optional, for rentals
  lumens?: number;      // optional, default to 2000
  resolution?: string;  // optional, default to '1080p'
  hdmi?: boolean;       // optional, default to true
  vga?: boolean;        // optional, default to false
  isRental?: boolean;   // optional, default to false
}

const ProductCard: FC<ProductCardProps> = ({
  slug,
  name = 'Unknown Product',
  image = '/images/placeholder.jpg',
  price = 0,
  pricePerDay = 0,
  lumens = 2000,
  resolution = '1080p',
  hdmi = true,
  vga = false,
  isRental = false,
}) => {
  const basePath = isRental ? '/rental' : '/shop';

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <Image
        src={image}
        alt={name}
        width={300}
        height={200}
        className="mb-4 object-cover"
        unoptimized={false} // optional: ensures Next.js image optimization
      />
      <h3 className="text-xl font-bold">{name}</h3>
      <p>{isRental ? `₦${pricePerDay}/day` : `₦${price}`}</p>
      <p>{`Lumens: ${lumens ?? 'N/A'} | Resolution: ${resolution ?? 'N/A'}`}</p>
      <p>{`HDMI: ${hdmi ? 'Yes' : 'No'} | VGA: ${vga ? 'Yes' : 'No'}`}</p>
      <Link href={`${basePath}/${slug}`}>
        <a className="text-blue-500 mt-2 inline-block">View Details</a>
      </Link>
    </div>
  );
};

export default ProductCard;