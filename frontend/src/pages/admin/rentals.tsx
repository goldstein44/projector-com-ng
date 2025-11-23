// src/pages/admin/rentals.tsx
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface Rental {
  id: string;
  slug: string;
  brand: string;
  model: string;
  price_per_day: number;
  image: string;
}

export default function AdminRentals() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRentals = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/data');
      const data = await res.json();
      setRentals(data.rentals || []);
    } catch (err) {
      console.error('Error fetching rentals:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this rental?')) return;

    try {
      const res = await fetch('/api/admin/delete-rental', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const result = await res.json();
      if (result.success) {
        setRentals(rentals.filter((r) => r.id !== id));
      } else {
        alert('Failed to delete rental.');
      }
    } catch (err) {
      console.error('Error deleting rental:', err);
      alert('Error deleting rental.');
    }
  };

  return (
    <div className="p-8">
      <Head>
        <title>Admin - Rentals</title>
      </Head>
      <h1 className="text-3xl font-bold mb-6">Rental Projectors</h1>
      <Link href="/admin/upload" className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Upload New Rental
      </Link>

      {loading ? (
        <p>Loading rentals...</p>
      ) : rentals.length === 0 ? (
        <p>No rentals found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Brand</th>
              <th className="p-2 border">Model</th>
              <th className="p-2 border">Price per Day</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((r) => (
              <tr key={r.id}>
                <td className="p-2 border">{r.brand}</td>
                <td className="p-2 border">{r.model}</td>
                <td className="p-2 border">{`₦${r.price_per_day.toLocaleString()}`}</td>
                <td className="p-2 border">
                  <img src={r.image || `/rentals/${r.slug}.jpg`} alt={r.model} width={80} />
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(r.id)}
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