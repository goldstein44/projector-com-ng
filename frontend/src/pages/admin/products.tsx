// src/pages/admin/products.tsx
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface Product {
  id: string;
  slug: string;
  brand: string;
  model: string;
  price: number;
  condition?: string | null;
  image: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/data');
      const data = await res.json();
      setProducts(data.sales || []);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`/api/admin/delete?id=${id}&type=sale`);
      const data = await res.json();

      if (data.success) {
        setProducts(products.filter((p) => p.id !== id));
      } else {
        alert('Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Error deleting product');
    }
  };

  return (
    <div className="p-8">
      <Head>
        <title>Admin - Products</title>
      </Head>
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <Link href="/admin/upload" className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Upload New Product
      </Link>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Brand</th>
              <th className="p-2 border">Model</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Condition</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="p-2 border">{p.brand}</td>
                <td className="p-2 border">{p.model}</td>
                <td className="p-2 border">{`₦${p.price.toLocaleString()}`}</td>
                <td className="p-2 border capitalize">
                  {typeof p.condition === 'string' ? p.condition.replace('_', ' ') : 'Unknown'}
                </td>
                <td className="p-2 border">
                  <img src={`/products/${p.slug}.jpg`} alt={p.model} width={80} />
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}