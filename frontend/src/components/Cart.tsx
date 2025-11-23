// frontend/components/Cart.tsx
import { useState } from 'react';
import axios from 'axios';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = ({ items }: { items: CartItem[] }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    deliveryType: 'PICKUP' as 'PICKUP' | 'DELIVERY',
    address: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
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

    setIsLoading(true);

    const orderData = {
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      delivery_type: formData.deliveryType,
      delivery_address: formData.deliveryType === 'DELIVERY' ? formData.address : null,
      items: items.map(item => ({
        product_name: item.name,
        product_id: item.productId,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
      total_amount: items.reduce((sum, item) => sum + item.price * item.quantity, 0) + (formData.deliveryType === 'DELIVERY' ? 3000 : 0),
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/+$/, '')}/orders/create_sale/`,
        orderData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.authorization_url) {
        window.location.href = response.data.authorization_url;
      } else {
        setErrors({ submit: 'Payment link not received. Try again.' });
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      setErrors({ 
        submit: error.response?.data?.detail || 'Payment failed. Please try again or contact us on WhatsApp.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deliveryFee = formData.deliveryType === 'DELIVERY' ? 3000 : 0;
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + deliveryFee;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {errors.submit && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" data-testid="cart-submit-error">
          {errors.submit}
        </div>
      )}

      {/* Cart Items */}
      {items.length === 0 ? (
        <p className="text-center text-gray-600 text-xl" data-testid="cart-empty">
          Your cart is empty.
        </p>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center gap-4 border-b pb-4" data-testid="cart-item">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₦{item.price.toLocaleString()} × {item.quantity}</p>
                </div>
                <p className="font-bold">₦{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2 text-lg">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery {formData.deliveryType === 'DELIVERY' ? '(₦3,000)' : '(Free Pickup)'}</span>
              <span>₦{deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-xl border-t pt-2">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Form */}
      {items.length > 0 && (
        <form className="bg-white rounded-lg shadow-md p-8 space-y-6 max-w-md mx-auto" data-testid="cart-form">
          <h2 className="text-2xl font-bold text-center">Checkout Details</h2>

          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              required
              data-testid="cart-input-name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              required
              data-testid="cart-input-email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Phone (WhatsApp)</label>
            <input
              type="tel"
              name="phone"
              placeholder="08012345678"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              required
              data-testid="cart-input-phone"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Delivery Option</label>
            <select
              name="deliveryType"
              value={formData.deliveryType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              data-testid="cart-select-delivery"
            >
              <option value="PICKUP">Pickup (Free)</option>
              <option value="DELIVERY">Delivery to your location (₦3,000)</option>
            </select>
          </div>

          {formData.deliveryType === 'DELIVERY' && (
            <div>
              <label className="block font-medium mb-1">Delivery Address</label>
              <input
                type="text"
                name="address"
                placeholder="Full address in Lekki/Ajah"
                value={formData.address}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                required
                data-testid="cart-input-address"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
          )}

          <button
            type="button"
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 disabled:opacity-70"
            data-testid="cart-checkout-button"
          >
            {isLoading ? 'Processing...' : 'Proceed to Pay with Paystack'}
          </button>

          <p className="text-center text-sm text-gray-600">
            You'll be redirected to Paystack to complete payment securely.
          </p>
        </form>
      )}
    </div>
  );
};

export default Cart;