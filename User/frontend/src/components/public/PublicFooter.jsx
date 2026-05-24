import React from 'react';
import { Link } from 'react-router-dom';

export default function PublicFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-slate-950">
      <div className="absolute inset-0 grain-overlay opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.9fr_0.9fr]">
          <div>
            <p className="display-font text-3xl text-white">Flowzint AI Commerce</p>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300">
              Premium wellness, bamboo salt, and men&apos;s cosmetics with an AI concierge designed to feel like a personal shopper and skincare strategist.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li><Link to="/" className="transition hover:text-white">Shop</Link></li>
              <li><Link to="/shop" className="transition hover:text-white">Shop all</Link></li>
              <li><Link to="/categories" className="transition hover:text-white">Categories</Link></li>
              <li><Link to="/cart" className="transition hover:text-white">Cart</Link></li>
              <li><Link to="/orders" className="transition hover:text-white">Orders</Link></li>
              <li><Link to="/concierge" className="transition hover:text-white">AI Concierge</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Newsletter</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Get replenishment drops, routine ideas, and launch updates.
            </p>
            <form className="mt-5 flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sage-200/40"
              />
              <button
                type="submit"
                className="rounded-full bg-sage-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
              >
                Join
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              {[
                {
                  label: 'Instagram',
                  icon: (
                    <path d="M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  ),
                },
                {
                  label: 'X',
                  icon: <path d="M4 4l16 16M20 4L4 20" strokeWidth="1.6" strokeLinecap="round" />,
                },
                {
                  label: 'TikTok',
                  icon: (
                    <path d="M14 4v9.5a4.5 4.5 0 11-4.5-4.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  ),
                },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  aria-label={item.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-sage-200/30 hover:bg-sage-200/10 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                    {item.icon}
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/5 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Built for the hackathon with React, Tailwind CSS, and GSAP.</p>
          <p>Wellness, bamboo salt, and men&apos;s cosmetics with smart replenishment.</p>
        </div>
      </div>
    </footer>
  );
}