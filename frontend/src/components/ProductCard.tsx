// frontend/components/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  pricePerDay?: number;  // For rentals
  lumens: number;
  resolution: string;
  hdmi: boolean;
  vga: boolean;
  isRental?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  slug, name, image, price, pricePerDay, lumens, resolution, hdmi, vga, isRental = false
}) => {
  const basePath = isRental ? '/rental' : '/shop';
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <Image src={image || '/placeholder.jpg'} alt={name} width={300} height={200} className="mb-4" />
      <h3 className="text-xl font-bold">{name}</h3>
      <p>{isRental ? `₦${pricePerDay}/day` : `₦${price}`}</p>
      <p>Lumens: {lumens} | Resolution: {resolution}</p>
      <p>HDMI: {hdmi ? 'Yes' : 'No'} | VGA: {vga ? 'Yes' : 'No'}</p>
      <Link href={`${basePath}/${slug}`} className="text-blue-500">View Details</Link>
    </div>
  );
};

export default ProductCard;



