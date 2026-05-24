import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, subtotal, shipping, total, placeOrder } = useCart();
  const pageRef = useRef(null);
  const [form, setForm] = useState({
    name: user?.name || 'Demo Shopper',
    email: user?.email || 'demo@flowzint.com',
    address: '12 Market Street',
    city: 'San Francisco',
  });

  useLayoutEffect(() => {
    if (!pageRef.current) {
      return undefined;
    }

    gsap.fromTo(pageRef.current.querySelectorAll('.checkout-reveal'), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06 });
    return undefined;
  }, []);

  const submitOrder = (event) => {
    event.preventDefault();
    const order = placeOrder(form);

    if (order) {
      navigate(`/track/${order.id}`, { replace: true });
    }
  };

  if (!cartItems.length) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center shadow-soft">
          <h1 className="text-3xl text-white">Nothing to checkout yet.</h1>
          <p className="mt-3 text-sm text-slate-400">Add items to your cart before placing an order.</p>
          <Link to="/shop" className="mt-6 inline-flex rounded-full bg-sage-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white">
            Go to shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main ref={pageRef} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="checkout-reveal mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-sage-200">Checkout</p>
        <h1 className="mt-3 text-4xl text-white sm:text-5xl">Confirm shipping and place your order.</h1>
      </div>

      <form onSubmit={submitOrder} className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="checkout-reveal space-y-4 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-soft">
          <h2 className="text-2xl text-white">Shipping details</h2>
          {['name', 'email', 'address', 'city'].map((field) => (
            <div key={field}>
              <label className="text-sm font-medium text-slate-200 capitalize">{field}</label>
              <input
                value={form[field]}
                onChange={(event) => setForm({ ...form, [field]: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none focus:border-sage-200/40"
              />
            </div>
          ))}
        </section>

        <aside className="checkout-reveal rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-soft h-fit">
          <h2 className="text-2xl text-white">Payment summary</h2>
          <div className="mt-5 space-y-3 text-sm text-slate-300">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between gap-4">
                <span className="truncate">{item.product.name} x {item.quantity}</span>
                <span>{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-white/10 pt-4"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex items-center justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-base font-semibold text-white"><span>Total</span><span>{formatPrice(total)}</span></div>
          </div>

          <button type="submit" className="mt-6 w-full rounded-full bg-sage-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white">
            Place order
          </button>
        </aside>
      </form>
    </main>
  );
}