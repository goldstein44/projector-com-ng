import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface RentalProduct {
  id: string;
  name: string;
  price_per_day: number;
  image: string;
}

interface BookingFormProps {
  deliveryType?: 'PICKUP' | 'DELIVERY';
  onDeliveryTypeChange?: (type: 'PICKUP' | 'DELIVERY') => void;
  onTotalChange?: (quantity: number, days: number, pricePerUnit: number, delivery: number) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  deliveryType: controlledDeliveryType,
  onDeliveryTypeChange,
  onTotalChange,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    deliveryType: 'PICKUP' as 'PICKUP' | 'DELIVERY',
    address: '',
    projectorId: '',
    quantity: 1,
    bookingDays: 1,
  });

  const [rentals, setRentals] = useState<RentalProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const { projectorId } = router.query;

  // Load rentals dynamically from API
  useEffect(() => {
    const loadRentals = async () => {
      try {
        const res = await fetch('/api/rentals/list', { cache: 'no-store' });
        const data = await res.json();
        if (Array.isArray(data)) {
          setRentals(data);
          if (projectorId) {
            const exists = data.some(r => r.id === String(projectorId));
            if (exists) setFormData(prev => ({ ...prev, projectorId: String(projectorId) }));
          }
        } else {
          setRentals([]);
          console.error('API returned invalid rentals data:', data);
        }
      } catch (err) {
        console.error('Failed to load rentals:', err);
        setRentals([]);
      }
    };
    loadRentals();
  }, [projectorId]);

  // Sync controlled delivery type
  useEffect(() => {
    if (controlledDeliveryType && controlledDeliveryType !== formData.deliveryType) {
      setFormData(prev => ({ ...prev, deliveryType: controlledDeliveryType }));
      calculateTotal(formData.quantity, formData.bookingDays, controlledDeliveryType);
    }
  }, [controlledDeliveryType]);

  // Calculate total dynamically
  const calculateTotal = (
    qty = formData.quantity,
    days = formData.bookingDays,
    deliveryType = formData.deliveryType
  ) => {
    const selectedRental = rentals.find(r => r.id === formData.projectorId);
    const pricePerUnit = selectedRental ? selectedRental.price_per_day : 0;
    const delivery = deliveryType === 'DELIVERY' ? 3000 : 0;
    const newTotal = qty * days * pricePerUnit + delivery;
    setTotal(newTotal);

    if (onTotalChange) {
      onTotalChange(qty, days, pricePerUnit, delivery);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let val: string | number = value;

    if (name === 'quantity' || name === 'bookingDays') {
      val = parseInt(String(value), 10) || 1;
    }

    setFormData(prev => {
      const updated = { ...prev, [name]: val } as typeof prev;

      if (name === 'deliveryType' && onDeliveryTypeChange) {
        onDeliveryTypeChange(val as 'PICKUP' | 'DELIVERY');
      }

      if (['quantity', 'bookingDays', 'deliveryType', 'projectorId'].includes(name)) {
        calculateTotal(updated.quantity, updated.bookingDays, updated.deliveryType as 'PICKUP' | 'DELIVERY');
      }

      return updated;
    });

    validateField(name, String(value));
  };

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };
    if (name === 'name' && !value.trim()) newErrors.name = 'Name is required';
    else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) newErrors.email = 'Valid email is required';
    else if (name === 'phone' && !value.trim()) newErrors.phone = 'Phone number is required';
    else if (name === 'address' && formData.deliveryType === 'DELIVERY' && !value.trim())
      newErrors.address = 'Address is required for delivery';
    else if (name === 'projectorId' && !value) newErrors.projectorId = 'Please select a projector';
    else delete newErrors[name];
    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (formData.deliveryType === 'DELIVERY' && !formData.address.trim())
      newErrors.address = 'Address is required for delivery';
    if (!formData.projectorId) newErrors.projectorId = 'Please select a projector';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const selectedRental = rentals.find(r => r.id === formData.projectorId);
    const data = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      delivery_type: formData.deliveryType,
      address: formData.address,
      items: [
        {
          rental_product_id: formData.projectorId,
          projector_name: selectedRental?.name || 'Unknown Projector',
          quantity: formData.quantity,
          booking_days: formData.bookingDays,
          price_per_day: selectedRental?.price_per_day || 15000,
        },
      ],
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}orders/create_rental/`,
        data
      );
      window.location.href = response.data.authorization_url;
    } catch (error: any) {
      console.error('Booking error:', error);
      setErrors({ submit: error.response?.data?.detail || 'Failed to process booking. Please try again.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      {/* Name */}
      <div>
        <label className="block">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : ''}`}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      {/* Delivery Type */}
      <div>
        <label className="block">Delivery Type</label>
        <select
          name="deliveryType"
          value={formData.deliveryType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="PICKUP">Pickup</option>
          <option value="DELIVERY">Delivery (+₦3000)</option>
        </select>
      </div>

      {/* Address */}
      {formData.deliveryType === 'DELIVERY' && (
        <div>
          <label className="block">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : ''}`}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>
      )}

      {/* Projector Dropdown */}
      <div>
        <label className="block">Select Projector</label>
        <select
          name="projectorId"
          value={formData.projectorId}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.projectorId ? 'border-red-500' : ''}`}
        >
          <option value="">Select a projector</option>
          {Array.isArray(rentals) && rentals.length > 0
            ? rentals.map(r => (
                <option key={r.id} value={r.id}>
                  {r.name} — ₦{r.price_per_day.toLocaleString()}/day
                </option>
              ))
            : <option disabled>Loading projectors...</option>}
        </select>
        {errors.projectorId && <p className="text-red-500 text-sm">{errors.projectorId}</p>}
      </div>

      {/* Quantity */}
      <div>
        <label className="block">Quantity</label>
        <input
          type="number"
          name="quantity"
          min="1"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Booking Days */}
      <div>
        <label className="block">Booking Days</label>
        <input
          type="number"
          name="bookingDays"
          min="1"
          value={formData.bookingDays}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Total */}
      <p className="text-xl font-bold">{`Total: ₦${total.toLocaleString()}`}</p>

      {/* Submit */}
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded font-semibold">
        Proceed to Payment
      </button>

      {errors.submit && <p className="text-red-500 text-sm mt-2">{errors.submit}</p>}
    </form>
  );
};

export default BookingForm;