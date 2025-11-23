// src/pages/admin/index.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/admin/AdminLayout';
import Image from 'next/image';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('upload');
  const [type, setType] = useState('sale');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [lumens, setLumens] = useState('');
  const [resolution, setResolution] = useState('');
  const [hdmi, setHdmi] = useState(true);
  const [vga, setVga] = useState(true);
  const [condition, setCondition] = useState('brand_new');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [items, setItems] = useState({ sales: [], rentals: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin/login');
    } else {
      fetchItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/data');
      const data = await res.json();
      // Ensure sales and rentals are arrays even if API returns undefined
      setItems({
        sales: Array.isArray(data.sales) ? data.sales : [],
        rentals: Array.isArray(data.rentals) ? data.rentals : [],
      });
    } catch (err) {
      console.error('Failed to fetch items:', err);
      setItems({ sales: [], rentals: [] });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return alert('Please select an image');
    if (!brand || !model || !price) return alert('Brand, Model and Price are required');

    setLoading(true);

    const formData = new FormData();
    formData.append('image', image);
    formData.append('type', type);
    formData.append('brand', brand);
    formData.append('model', model);
    formData.append('lumens', lumens);
    formData.append('resolution', resolution);
    formData.append('hdmi', hdmi.toString());
    formData.append('vga', vga.toString());
    formData.append('condition', condition);
    formData.append('price', price);
    formData.append('description', description);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('Projector uploaded successfully!');
        fetchItems();
        // Reset form
        setBrand('');
        setModel('');
        setLumens('');
        setResolution('');
        setPrice('');
        setDescription('');
        setImage(null);
        setPreview('');
        setType('sale');
      } else {
        const error = await res.text();
        alert('Upload failed: ' + error);
      }
    } catch (err) {
      alert('Network error. Check console.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, t) => {
    if (!confirm('Delete this projector?')) return;
    await fetch(`/api/admin/delete?id=${id}&type=${t === 'rent' ? 'rent' : 'sale'}`);
    fetchItems();
  };

  return (
    <AdminLayout>
      <div className="flex gap-8 mb-8">
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-6 py-3 rounded ${activeTab === 'upload' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Add New Projector
        </button>
        <button
          onClick={() => setActiveTab('list')}
          className={`px-6 py-3 rounded ${activeTab === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          All Projectors ({(items.sales?.length || 0) + (items.rentals?.length || 0)})
        </button>
      </div>

      {activeTab === 'upload' && (
        <div className="bg-white p-8 rounded-lg shadow max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Add New Projector</h2>
          <form onSubmit={handleUpload} encType="multipart/form-data" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select value={type} onChange={(e) => setType(e.target.value)} className="p-3 border rounded">
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>

            <input placeholder="Brand (e.g. Epson)" value={brand} onChange={(e) => setBrand(e.target.value)} className="p-3 border rounded" required />
            <input placeholder="Model (e.g. EB-X06)" value={model} onChange={(e) => setModel(e.target.value)} className="p-3 border rounded" required />
            <input placeholder="Lumens (e.g. 3600)" value={lumens} onChange={(e) => setLumens(e.target.value)} className="p-3 border rounded" />
            <input placeholder="Resolution (e.g. 1080p)" value={resolution} onChange={(e) => setResolution(e.target.value)} className="p-3 border rounded" />

            <div className="flex gap-6">
              <label>
                <input type="checkbox" checked={hdmi} onChange={(e) => setHdmi(e.target.checked)} /> HDMI
              </label>
              <label>
                <input type="checkbox" checked={vga} onChange={(e) => setVga(e.target.checked)} /> VGA
              </label>
            </div>

            <select value={condition} onChange={(e) => setCondition(e.target.value)} className="p-3 border rounded">
              <option value="brand_new">Brand New</option>
              <option value="tokunbo">Tokunbo</option>
            </select>

            <input placeholder={type === 'sale' ? 'Price (₦)' : 'Price per day (₦)'} value={price} onChange={(e) => setPrice(e.target.value)} className="p-3 border rounded" required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="p-3 border rounded md:col-span-2" rows={4} />

            <div className="md:col-span-2">
              <input type="file" accept="image/*" onChange={handleImageChange} required className="w-full p-3 border rounded" />
              {preview && <img src={preview} alt="preview" width="500" height="400" className="mt-4 rounded shadow" />}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Uploading...' : `Upload ${type === 'sale' ? 'Sale' : 'Rental'} Projector`}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'list' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">All Projectors</h2>
          {[...(items.sales || []), ...(items.rentals || [])].map((p) => (
            <div key={p.id} className="bg-white p-6 rounded-lg shadow mb-6 flex gap-6">
              <Image src={p.type === 'sale' ? `/products/${p.slug}.jpg` : `/rentals/${p.slug}.jpg`} width={300} height={200} alt={p.model} className="rounded" />
              <div className="flex-1">
                <h3 className="text-xl font-bold">{p.brand} {p.model}</h3>
                <p className="text-gray-600">{p.lumens} lumens • {p.resolution}</p>
                <p className="mt-2">{p.description}</p>
                <p className="text-2xl font-bold text-blue-600 mt-4">₦{Number(p.price).toLocaleString()}</p>
                <button onClick={() => handleDelete(p.id, p.type)} className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}