import React, { useLayoutEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const navLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'Categories', to: '/categories' },
];

export default function PublicNavbar() {
  const { user, isLoggedIn } = useAuth();
  const { cartCount, orders } = useCart();
  const navigate = useNavigate();
  const underlineRefs = useRef({});
  const latestOrderId = orders[0]?.id;

  useLayoutEffect(() => {
    Object.values(underlineRefs.current).forEach((underline) => {
      if (underline) {
        gsap.set(underline, { scaleX: 0, transformOrigin: 'left center' });
      }
    });
  }, []);

  const animateUnderline = (key, open) => {
    const underline = underlineRefs.current[key];

    if (!underline) {
      return;
    }

    gsap.to(underline, {
      scaleX: open ? 1 : 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-300/15 text-sage-100 ring-1 ring-inset ring-sage-200/20 transition group-hover:bg-sage-300/20">
            <span className="display-font text-lg font-semibold">F</span>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-300">Flowzint</p>
            <p className="text-xs text-slate-500">AI commerce for everyday essentials</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onMouseEnter={() => animateUnderline(link.label, true)}
              onMouseLeave={() => animateUnderline(link.label, false)}
              className="group relative text-sm font-medium text-slate-300 transition hover:text-white"
            >
              <span>{link.label}</span>
              <span
                ref={(element) => {
                  underlineRefs.current[link.label] = element;
                }}
                className="absolute -bottom-2 left-0 h-px w-full origin-left bg-sage-200"
              />
            </Link>
          ))}

          <Link
            to={latestOrderId ? `/track/${latestOrderId}` : '/orders'}
            className="group relative text-sm font-medium text-slate-300 transition hover:text-white"
          >
            <span>Track order</span>
            <span className="absolute -bottom-2 left-0 h-px w-full origin-left bg-sage-200" />
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:border-sage-200/30 hover:bg-sage-200/10"
            aria-label={`Cart with ${cartCount} items`}
          >
            <span className="relative flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                <path
                  d="M3 3h2l.6 3M7 13h10l3-7H6.2M7 13l-1.2-7M7 13l-1.2 5h11.9M10 21a1 1 0 100-2 1 1 0 000 2zM17 21a1 1 0 100-2 1 1 0 000 2z"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {cartCount > 0 ? (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-sage-200 px-1 text-[10px] font-semibold text-slate-950">
                  {cartCount}
                </span>
              ) : null}
            </span>
          </button>

          <Link
            to={isLoggedIn ? '/profile' : '/auth/login'}
            className="flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 pr-4 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/10"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-200/15 text-sm font-semibold text-sage-100 ring-1 ring-inset ring-sage-200/20">
              {user?.initials || 'U'}
            </span>
            <span className="hidden sm:inline">{user ? user.name : 'Profile'}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}