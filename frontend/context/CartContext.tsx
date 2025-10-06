// frontend/context/CartContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';

export type CartItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  updateItemQuantity: (id: number | string, qty: number) => void;
  removeItem: (id: number | string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

/**
 * Robust CartProvider that:
 * - reads seeded data synchronously from window.__CYPRESS_CART (if present)
 * - falls back to localStorage 'cart'
 * - persists updates to localStorage
 * - listens to storage events to sync across tabs
 */
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const getInitialCart = (): CartItem[] => {
    try {
      if (typeof window === 'undefined') return [];
      // Cypress helper — tests will set window.__CYPRESS_CART before scripts run
      const w = window as any;
      if (Array.isArray(w.__CYPRESS_CART)) {
        return w.__CYPRESS_CART as CartItem[];
      }
      const raw = localStorage.getItem('cart');
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch (err) {
      // if parsing fails, return empty
      return [];
    }
  };

  const [cartItems, setCartItems] = useState<CartItem[]>(getInitialCart);

  // Persist to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (err) {
      // ignore write errors (e.g., private mode)
    }
  }, [cartItems]);

  // Listen to storage events (sync across tabs)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'cart') {
        try {
          setCartItems(e.newValue ? JSON.parse(e.newValue) : []);
        } catch {
          setCartItems([]);
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const syncAndSet = useCallback((items: CartItem[]) => {
    setCartItems(items);
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch {}
  }, []);

  const addItem = (item: CartItem) => {
    setCartItems((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p
        );
      }
      return [...prev, item];
    });
  };

  const updateItemQuantity = (id: number | string, qty: number) => {
    setCartItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p)));
  };

  const removeItem = (id: number | string) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => {
    syncAndSet([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addItem, updateItemQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;