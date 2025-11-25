// pages/api/products/[id].js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { id } = req.query;
  const productsDir = path.join(process.cwd(), 'public', 'products');

  try {
    const files = fs.readdirSync(productsDir);

    const file = files.find(f => f.includes(id));
    if (!file) return res.status(404).json({ error: 'Product not found' });

    const product = {
      id,
      name: file.split('.')[0],
      image: `/products/${file}`,
      description: `Description for ${file.split('.')[0]}`,
      price: Math.floor(Math.random() * 1000) + 100
    };

    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}