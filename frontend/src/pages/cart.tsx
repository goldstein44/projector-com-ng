// frontend/pages/cart.tsx
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useContext, useState } from 'react';
import { CartContext, CartItem } from '../../context/CartContext';

function CartPage() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('CartPage must be used within a CartProvider');
  }

  const { cartItems } = context;

  // ✅ Form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    delivery: 'pickup',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});

  // ✅ Validation function
  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = 'Valid email is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    // 🚀 proceed to backend call here
    alert('Form submitted!');
  };

  return (
    <div>
      <Head>
        <title>Cart | projector online</title>
        <meta
          name="description"
          content="Review your projector purchase cart before checkout."
        />
        <meta
          name="keywords"
          content="projector cart, buy projector in Lekki"
        />
      </Head>
      <Header />
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p data-testid="cart-empty">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item: CartItem, idx: number) => (
              <div
                key={idx}
                data-testid="cart-item"
                className="border rounded p-4 shadow-sm"
              >
                <p className="font-semibold">{item.name}</p>
                <p>Qty: {item.quantity}</p>
                <p>Price: ₦{item.price}</p>
              </div>
            ))}

            {/* ✅ Checkout Form with validation */}
            <form
              className="mt-6 space-y-4"
              onSubmit={handleSubmit}
              noValidate
            >
              <div>
                <input
                  data-testid="cart-input-name"
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border rounded p-2 w-full"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  data-testid="cart-input-email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="border rounded p-2 w-full"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  data-testid="cart-input-phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="border rounded p-2 w-full"
                />
                {errors.phone && (
                  <p className="text-red-500">{errors.phone}</p>
                )}
              </div>

              <select
                data-testid="cart-input-delivery"
                value={form.delivery}
                onChange={(e) =>
                  setForm({ ...form, delivery: e.target.value })
                }
                className="border rounded p-2 w-full"
              >
                <option value="pickup">Pickup</option>
                <option value="delivery">Delivery</option>
              </select>

              <button
                type="submit"
                data-testid="cart-checkout-button"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Checkout
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

// ✅ Export wrapped in next/dynamic with SSR disabled
export default dynamic(() => Promise.resolve(CartPage), {
  ssr: false,
});