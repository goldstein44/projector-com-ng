// components/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  lumens: number;
  resolution: string;
  hdmi: boolean;
  vga: boolean;
  condition?: 'brand_new' | 'tokunbo';
  description?: string;
  isRental: boolean;
}

export default function ProductCard({
  id,
  slug,
  name,
  image,
  price,
  lumens,
  resolution,
  hdmi,
  vga,
  condition,
  description,
  isRental,
}: ProductCardProps) {
  const normalizedSrc =
    typeof image === 'string' && image.trim().length > 0
      ? image.startsWith('/')
        ? image
        : `/${image}`
      : '/placeholder.jpg';

  // Determine the correct link URL
  const linkHref = isRental ? `/booking?projectorId=${id}` : `/shop/${slug}`;
  const buttonText = isRental ? 'Book Now' : 'View Details';
  const buttonClass = isRental
    ? 'bg-green-600 hover:bg-green-700'
    : 'bg-blue-600 hover:bg-blue-700';

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1">
      <Link href={linkHref}>
        <a>
          <div className="relative">
            <Image
              src={normalizedSrc}
              alt={name}
              width={600}
              height={500}
              className="w-full h-64 object-cover"
            />
            {condition && (
              <span
                className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg ${
                  condition === 'brand_new' ? 'bg-green-600' : 'bg-orange-600'
                }`}
              >
                {condition === 'brand_new' ? 'Brand New' : 'Tokunbo'}
              </span>
            )}
          </div>
        </a>
      </Link>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>

        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        )}

        <div className="space-y-2 text-sm text-gray-700 mb-4">
          <p>
            <strong>Lumens:</strong> {lumens?.toLocaleString?.() ?? 'N/A'}
          </p>
          <p>
            <strong>Resolution:</strong> {resolution ?? 'N/A'}
          </p>
          <div className="flex gap-3">
            {hdmi && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                HDMI
              </span>
            )}
            {vga && (
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs">
                VGA
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-blue-700">
            ₦{price.toLocaleString()}
            {!isRental && <span className="text-sm text-gray-500"> only</span>}
            {isRental && <span className="text-sm block text-gray-600">per day</span>}
          </p>

          <Link href={linkHref}>
            <a className={`px-6 py-3 rounded-lg font-bold text-white transition ${buttonClass}`}>
              {buttonText}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}