// pages/api/admin/data.js
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'projectors.json');

export default function handler(req, res) {
  if (!fs.existsSync(DATA_FILE)) {
    return res.status(200).json({ sales: [], rentals: [] });
  }

  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  res.status(200).json(data);
}