// frontend/src/components/BookingForm.tsx
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useRouter } from 'next/router';

interface RentalProduct {
  id: string;
  name: string;
  price_per_day: number;
}

interface BookingFormProps {
  onTotalChange?: (total: number) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onTotalChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    deliveryType: 'PICKUP',
    address: '',
    projectorId: '',
    quantity: 1,
    startDate: new Date(),
    endDate: new Date(),
    bookingDays: 1,
  });
  const [rentals, setRentals] = useState<RentalProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const { projectorId } = router.query;

  // fetch rentals
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}rentals/`)
      .then((res) => setRentals(res.data))
      .catch((err) => console.error('Error fetching rentals:', err));
  }, []);

  // preselect projector from query
  useEffect(() => {
    if (projectorId && rentals.length > 0) {
      const exists = rentals.some((r) => String(r.id) === String(projectorId));
      if (exists) {
        setFormData((prev) => ({ ...prev, projectorId: String(projectorId) }));
      }
    }
  }, [projectorId, rentals]);

  const calculateDays = () => {
    return (
      Math.ceil(
        (formData.endDate.getTime() - formData.startDate.getTime()) /
          (1000 * 3600 * 24)
      ) + 1
    );
  };

  useEffect(() => {
    const days = calculateDays();
    setFormData((prev) => ({ ...prev, bookingDays: days }));
  }, [formData.startDate, formData.endDate]);

  useEffect(() => {
    calculateTotal();
  }, [
    formData.startDate,
    formData.endDate,
    formData.quantity,
    formData.deliveryType,
    formData.projectorId,
    rentals,
  ]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validateField(e.target.name, e.target.value);
  };

  const handleDateChange = (date: Date | null, name: string) => {
    if (!date) return;
    setFormData({ ...formData, [name]: date });
  };

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };
    if (name === 'name' && !value.trim()) {
      newErrors.name = 'Name is required';
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      newErrors.email = 'Valid email is required';
    } else if (name === 'phone' && !value.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (
      name === 'address' &&
      formData.deliveryType === 'DELIVERY' &&
      !value.trim()
    ) {
      newErrors.address = 'Address is required for delivery';
    } else if (name === 'projectorId' && !value) {
      newErrors.projectorId = 'Please select a projector';
    } else {
      delete newErrors[name];
    }
    setErrors(newErrors);
  };

  const calculateTotal = () => {
    const days = calculateDays();
    const selectedRental = rentals.find((r) => String(r.id) === formData.projectorId);
    const base = selectedRental
      ? selectedRental.price_per_day * formData.quantity * days
      : 0;
    const delivery = formData.deliveryType === 'DELIVERY' ? 3000 : 0;
    const newTotal = base + delivery;
    setTotal(newTotal);

    if (onTotalChange) {
      onTotalChange(newTotal);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (
      formData.deliveryType === 'DELIVERY' &&
      !formData.address.trim()
    )
      newErrors.address = 'Address is required for delivery';
    if (!formData.projectorId)
      newErrors.projectorId = 'Please select a projector';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      delivery_type: formData.deliveryType,
      address: formData.address,
      items: [
        {
          rental_product_id: formData.projectorId,
          quantity: formData.quantity,
          start_date: formData.startDate.toISOString().split('T')[0],
          end_date: formData.endDate.toISOString().split('T')[0],
        },
      ],
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}orders/create_rental/`,
        data
      );
      window.location.href = response.data.authorization_url;
    } catch (error) {
      console.error('Booking error:', error);
      setErrors({
        submit: 'Failed to process booking. Please try again.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      {/* Name */}
      <div>
        <label className="block">Name</label>
        <input
          data-testid="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${
            errors.name ? 'border-red-500' : ''
          }`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block">Email</label>
        <input
          data-testid="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${
            errors.email ? 'border-red-500' : ''
          }`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block">Phone</label>
        <input
          data-testid="phone"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${
            errors.phone ? 'border-red-500' : ''
          }`}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      {/* Delivery Type */}
      <div>
        <label className="block">Delivery Type</label>
        <select
          data-testid="delivery-type"
          name="deliveryType"
          value={formData.deliveryType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="PICKUP">Pickup</option>
          <option value="DELIVERY">Delivery (+₦3000)</option>
        </select>
      </div>

      {/* Address (only required if Delivery) */}
      {formData.deliveryType === 'DELIVERY' && (
        <div>
          <label className="block">Address</label>
          <input
            data-testid="address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.address ? 'border-red-500' : ''
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>
      )}

      {/* Projector */}
      <div>
        <label className="block">Select Projector</label>
        <select
          data-testid="projector"
          name="projectorId"
          value={formData.projectorId}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${
            errors.projectorId ? 'border-red-500' : ''
          }`}
          required
        >
          <option value="">Select a projector</option>
          {rentals.map((rental) => (
            <option key={rental.id} value={rental.id}>
              {rental.name}
            </option>
          ))}
        </select>
        {errors.projectorId && (
          <p className="text-red-500 text-sm">{errors.projectorId}</p>
        )}
      </div>

      {/* Quantity */}
      <div>
        <label className="block">Quantity</label>
        <input
          data-testid="quantity"
          type="number"
          name="quantity"
          min="1"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Booking Days (calculated, read-only) */}
      <div>
        <label className="block">Booking Days</label>
        <input
          data-testid="booking-days"
          type="number"
          name="bookingDays"
          value={formData.bookingDays}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />
      </div>

      <p>Total: ₦{total}</p>

      <button
        data-testid="book-now"
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Book Now
      </button>
    </form>
  );
};

export default BookingForm;