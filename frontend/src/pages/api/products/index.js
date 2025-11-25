// pages/api/products/index.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const productsDir = path.join(process.cwd(), 'public', 'products');

    // Read all files in products folder
    const files = fs.readdirSync(productsDir);

    // Create product objects from filenames
    const products = files.map((file, index) => {
      const name = file.split('.')[0]; // name from file
      return {
        id: `${Date.now()}-${index}`, // unique id
        name: name,
        image: `/products/${file}`,
        description: `Description for ${name}`, // optional placeholder
        price: Math.floor(Math.random() * 1000) + 100 // optional price placeholder
      };
    });

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}