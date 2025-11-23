// pages/api/admin/upload.js
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = { api: { bodyParser: false } };

const DATA_FILE = path.join(process.cwd(), 'data', 'projectors.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const form = formidable({
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    multiples: false,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Formidable parse error:', err);
      return res.status(500).json({ error: 'Upload failed' });
    }

    try {
      const file = Array.isArray(files.image) ? files.image[0] : files.image;
      if (!file) return res.status(400).json({ error: 'No image uploaded' });

      // Normalize incoming 'type' values from the form (accept rent/rental, sale/sales, product/products)
      const rawType = Array.isArray(fields.type) ? fields.type[0] : fields.type;
      const typeStr = typeof rawType === 'string' ? rawType.toLowerCase() : 'sale';

      const isRental = ['rent', 'rental', 'rentals'].includes(typeStr);
      const isSale = ['sale', 'sales', 'product', 'products'].includes(typeStr);

      // canonical type stored in JSON: 'rental' or 'sale'
      const canonicalType = isRental ? 'rental' : 'sale';

      // decide folder used in public/
      const folder = isRental ? 'rentals' : 'products';

      const ext = path.extname(file.originalFilename || file.newFilename || '') || '.jpg';
      const slug = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const finalFilename = `${slug}${ext}`;
      const finalPath = path.join(process.cwd(), 'public', folder, finalFilename);

      fs.mkdirSync(path.dirname(finalPath), { recursive: true });

      if (!file.filepath) {
        console.error('Filepath is undefined:', file);
        return res.status(500).json({ error: 'File path missing' });
      }

      fs.renameSync(file.filepath, finalPath);

      const newProjector = {
        id: Date.now().toString(),
        slug,
        type: canonicalType,
        brand: (Array.isArray(fields.brand) ? fields.brand[0] : fields.brand) || 'Unknown',
        model: (Array.isArray(fields.model) ? fields.model[0] : fields.model) || 'Unknown',
        lumens: parseInt(Array.isArray(fields.lumens) ? fields.lumens[0] : fields.lumens) || 0,
        resolution: (Array.isArray(fields.resolution) ? fields.resolution[0] : fields.resolution) || 'Unknown',
        hdmi: (Array.isArray(fields.hdmi) ? fields.hdmi[0] : fields.hdmi) === 'true',
        vga: (Array.isArray(fields.vga) ? fields.vga[0] : fields.vga) === 'true',
        condition: (Array.isArray(fields.condition) ? fields.condition[0] : fields.condition) || 'tokunbo',
        price: parseInt(Array.isArray(fields.price) ? fields.price[0] : fields.price) || 0,
        description: (Array.isArray(fields.description) ? fields.description[0] : fields.description) || '',
        image: `/${folder}/${finalFilename}`,
      };

      let data;
      if (fs.existsSync(DATA_FILE)) {
        try {
          data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
          if (!data || typeof data !== 'object') data = { sales: [], rentals: [] };
          if (!data.sales) data.sales = [];
          if (!data.rentals) data.rentals = [];
        } catch (e) {
          console.error('Error parsing projectors.json, resetting file', e);
          data = { sales: [], rentals: [] };
        }
      } else {
        data = { sales: [], rentals: [] };
      }

      // Add to correct list using normalized flags (and ensure rental entries include price_per_day)
      if (isRental) {
        data.rentals.push({ ...newProjector, price_per_day: newProjector.price });
      } else {
        data.sales.push(newProjector);
      }

      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

      return res.status(200).json({ success: true });
    } catch (e) {
      console.error('Upload handler error:', e);
      return res.status(500).json({ error: 'Upload failed' });
    }
  });
}