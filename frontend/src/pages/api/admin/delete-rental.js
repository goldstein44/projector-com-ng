// src/pages/api/admin/delete-rental.js
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'projectors.json');

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ success: false, message: 'ID is required' });
  }

  try {
    if (!fs.existsSync(DATA_FILE)) {
      return res.status(404).json({ success: false, message: 'Data file not found' });
    }

    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));

    // Remove the rental by ID
    data.rentals = (data.rentals || []).filter((r) => r.id !== id);

    // Write back to the JSON file
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error deleting rental:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}