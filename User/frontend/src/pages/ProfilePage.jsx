import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export default function ProfilePage() {
  const { user, logout, isLoggedIn } = useAuth();
  const { cartCount, orders } = useCart();

  if (!isLoggedIn) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-soft">
          <h1 className="text-3xl text-white">Sign in to view your profile.</h1>
          <Link to="/auth/login" className="mt-6 inline-flex rounded-full bg-sage-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white">
            Go to login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-200/15 text-xl font-semibold text-sage-100 ring-1 ring-inset ring-sage-200/20">
              {user?.initials || 'U'}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-sage-200">Account</p>
              <h1 className="mt-2 text-3xl text-white">{user?.name}</h1>
              <p className="text-sm text-slate-400">{user?.email}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Cart items</p>
              <p className="mt-2 text-2xl text-white">{cartCount}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Orders</p>
              <p className="mt-2 text-2xl text-white">{orders.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Vibe</p>
              <p className="mt-2 text-2xl text-white">{user?.vibe || 'Day Browse'}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="mt-8 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
          >
            Sign out
          </button>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-soft">
          <h2 className="text-2xl text-white">Saved shortcuts</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              { label: 'Go to cart', to: '/cart' },
              { label: 'Checkout', to: '/checkout' },
              { label: 'View orders', to: '/orders' },
              { label: 'Browse shop', to: '/shop' },
            ].map((item) => (
              <Link key={item.label} to={item.to} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-5 text-sm font-semibold text-white transition hover:border-sage-200/30 hover:bg-sage-200/10">
                {item.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}