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

  // image prop may be absolute url (https://...), a relative url (/products/...), or a placeholder.
  // Ensure we always pass a string to next/image.
  const src =
    typeof image === 'string'
      ? image
      : (image && (image as any).url) || '/images/placeholder.jpg';

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <Image
        src={src}
        alt={name}
        width={300}
        height={200}
        className="mb-4 object-cover rounded-md"
        unoptimized={false}
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