// pages/api/admin/delete.js
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'projectors.json');

export default function handler(req, res) {
  const { id, type } = req.query;

  if (!id || !type) return res.status(400).json({ error: 'Missing id or type' });

  if (!fs.existsSync(DATA_FILE)) return res.status(404).json({ error: 'No data' });

  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  let item;

  if (type === 'sale') {
    item = data.sales.find(p => p.id === id);
    data.sales = data.sales.filter(p => p.id !== id);
  } else {
    item = data.rentals.find(p => p.id === id);
    data.rentals = data.rentals.filter(p => p.id !== id);
  }

  if (item) {
    const folder = type === 'rent' ? 'rentals' : 'products';
    const imagePath = path.join(process.cwd(), 'public', folder, `${item.slug}.jpg`);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.status(200).json({ success: true });
}