// frontend/components/Cart.tsx
import { useState } from 'react';
import axios from 'axios';

interface CartItem {
  productId: string;
  quantity: number;
}

const Cart = ({ items }: { items: Array<CartItem> }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    deliveryType: 'PICKUP',
    address: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validateField(e.target.name, e.target.value);
  };

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };
    if (name === 'name' && !value.trim()) {
      newErrors.name = 'Name is required';
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      newErrors.email = 'Valid email is required';
    } else if (name === 'phone' && !value.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (name === 'address' && formData.deliveryType === 'DELIVERY' && !value.trim()) {
      newErrors.address = 'Address is required for delivery';
    } else {
      delete newErrors[name];
    }
    setErrors(newErrors);
  };

  const handleCheckout = async () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (formData.deliveryType === 'DELIVERY' && !formData.address.trim()) newErrors.address = 'Address is required for delivery';

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
      items: items.map(item => ({ product_id: item.productId, quantity: item.quantity })),
    };
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}orders/create_sale/`, data);
      window.location.href = response.data.authorization_url;
    } catch (error) {
      console.error('Checkout error:', error);
      setErrors({ submit: 'Failed to process checkout. Please try again.' });
    }
  };

  return (
    <div className="p-4">
      {errors.submit && (
        <p className="text-red-500" data-testid="cart-submit-error">
          {errors.submit}
        </p>
      )}

      {/* Display cart items */}
      {items.length === 0 ? (
        <p data-testid="cart-empty">Your cart is empty.</p>
      ) : (
        <ul>
          {items.map(item => (
            <li
              key={item.productId}
              data-testid="cart-item"
            >
              Product ID: {item.productId} x{' '}
              <span data-testid="cart-item-quantity">{item.quantity}</span>
              <button
                type="button"
                data-testid="cart-item-remove"
                className="ml-2 text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Checkout form */}
      <form className="space-y-4 max-w-md mx-auto" data-testid="cart-form">
        <div>
          <label className="block">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
            required
            data-testid="cart-input-name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label className="block">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
            required
            data-testid="cart-input-email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label className="block">Phone (WhatsApp)</label>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : ''}`}
            required
            data-testid="cart-input-phone"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        <div>
          <label className="block">Delivery Type</label>
          <select
            name="deliveryType"
            value={formData.deliveryType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            data-testid="cart-select-delivery"
          >
            <option value="PICKUP">Pickup</option>
            <option value="DELIVERY">Delivery (₦3,000)</option>
          </select>
        </div>
        {formData.deliveryType === 'DELIVERY' && (
          <div>
            <label className="block">Delivery Address</label>
            <input
              type="text"
              name="address"
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : ''}`}
              required
              data-testid="cart-input-address"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>
        )}
        <button
          type="button"
          onClick={handleCheckout}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          data-testid="cart-checkout-button"
        >
          Checkout
        </button>
      </form>
    </div>
  );
};

export default Cart;