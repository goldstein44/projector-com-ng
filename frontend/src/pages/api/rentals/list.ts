import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Rental {
  id: string;
  name: string;
  price_per_day: number;
  image: string;
}

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Rental[] | { error: string }>
) {
  try {
    const jsonPath = path.join(process.cwd(), 'public', 'rentals', 'rentals.json');

    // Check if rentals.json exists
    if (!fs.existsSync(jsonPath)) {
      console.warn('rentals.json not found, returning empty array');
      return res.status(200).json([]);
    }

    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    let rentals: Rental[] = [];

    try {
      const parsed = JSON.parse(rawData);
      if (Array.isArray(parsed)) {
        rentals = parsed;
      } else {
        console.warn('rentals.json is not an array, returning empty array');
      }
    } catch (err) {
      console.error('Failed to parse rentals.json, returning empty array', err);
    }

    res.status(200).json(rentals);
  } catch (err) {
    console.error('Unexpected error in /api/rentals/list', err);
    res.status(500).json({ error: 'Failed to list rentals' });
  }
}