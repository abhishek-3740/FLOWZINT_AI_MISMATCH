import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const CART_KEY = 'flowzint-cart-items';
const ORDERS_KEY = 'flowzint-order-history';

function readStorage(key, fallbackValue) {
  if (typeof window === 'undefined') {
    return fallbackValue;
  }

  const storedValue = window.localStorage.getItem(key);

  if (!storedValue) {
    return fallbackValue;
  }

  try {
    return JSON.parse(storedValue);
  } catch {
    return fallbackValue;
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => readStorage(CART_KEY, []));
  const [orders, setOrders] = useState(() => readStorage(ORDERS_KEY, []));

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.product.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...currentItems, { product, quantity }];
    });
  };

  const getItemQuantity = (productId) =>
    cartItems.find((item) => item.product.id === productId)?.quantity ?? 0;

  const updateQuantity = (productId, quantity) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) => (item.product.id === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  const placeOrder = (customerInfo) => {
    if (!cartItems.length) {
      return null;
    }

    const createdAt = new Date();
    const expectedDelivery = new Date(createdAt);
    expectedDelivery.setDate(expectedDelivery.getDate() + 3);

    const tracking = {
      status: 'Shipped',
      carrier: 'Flowzint Express',
      trackingNumber: `FZ-${Date.now().toString().slice(-8)}`,
      expectedDelivery: expectedDelivery.toISOString(),
      currentStage: 3,
      milestones: [
        { label: 'Order confirmed', completed: true, time: createdAt.toISOString(), detail: 'Payment received and order reserved.' },
        { label: 'Packed', completed: true, time: new Date(createdAt.getTime() + 20 * 60 * 1000).toISOString(), detail: 'Items packed at the nearest fulfillment center.' },
        { label: 'Shipped', completed: true, time: new Date(createdAt.getTime() + 2 * 60 * 60 * 1000).toISOString(), detail: 'Package handed to the delivery carrier.' },
        { label: 'Out for delivery', completed: false, time: new Date(expectedDelivery.getTime() - 4 * 60 * 60 * 1000).toISOString(), detail: 'Courier is en route to your address.' },
        { label: 'Delivered', completed: false, time: expectedDelivery.toISOString(), detail: 'Package delivered to your doorstep.' },
      ],
    };

    const order = {
      id: `order-${Date.now()}`,
      createdAt: createdAt.toISOString(),
      items: cartItems,
      customerInfo,
      subtotal,
      shipping,
      total,
      tracking,
    };

    setOrders((currentOrders) => [order, ...currentOrders]);
    clearCart();
    return order;
  };

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartItems],
  );

  const shipping = useMemo(() => (subtotal >= 75 || subtotal === 0 ? 0 : 6.95), [subtotal]);

  const total = useMemo(() => subtotal + shipping, [subtotal, shipping]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const value = {
    cartItems,
    cartCount,
    subtotal,
    shipping,
    total,
    orders,
    addToCart,
    getItemQuantity,
    updateQuantity,
    removeFromCart,
    clearCart,
    placeOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}