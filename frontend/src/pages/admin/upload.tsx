// src/pages/admin/upload.tsx
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function UploadPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    type: 'sale', // 'sale' or 'rent'
    brand: '',
    model: '',
    price: '',
    condition: 'brand_new',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('type', form.type);
      formData.append('brand', form.brand);
      formData.append('model', form.model);
      formData.append('price', form.price);
      formData.append('condition', form.condition);
      // @ts-ignore
      if ((e.target as any).image?.files[0]) {
        // @ts-ignore
        formData.append('image', (e.target as any).image.files[0]);
      }

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) alert('Upload successful!');
      else alert('Upload failed');
    } catch (err) {
      console.error(err);
      alert('Upload error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <Head>
        <title>Admin - Upload Projector</title>
      </Head>
      <h1 className="text-3xl font-bold mb-6">Upload New Projector</h1>
      <Link href="/admin" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to Dashboard
      </Link>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block mb-1">Type</label>
          <select name="type" value={form.type} onChange={handleChange} className="border p-2 w-full">
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Brand</label>
          <input name="brand" value={form.brand} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block mb-1">Model</label>
          <input name="model" value={form.model} onChange={handleChange} className="border p-2 w-full" />
        </div>

        <div>
          <label className="block mb-1">{form.type === 'sale' ? 'Price' : 'Price per Day'}</label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            className="border p-2 w-full"
          />
        </div>

        {form.type === 'sale' && (
          <div>
            <label className="block mb-1">Condition</label>
            <select name="condition" value={form.condition} onChange={handleChange} className="border p-2 w-full">
              <option value="brand_new">Brand New</option>
              <option value="tokunbo">Tokunbo</option>
            </select>
          </div>
        )}

        <div>
          <label className="block mb-1">Image</label>
          <input name="image" type="file" accept="image/*" className="border p-2 w-full" />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}