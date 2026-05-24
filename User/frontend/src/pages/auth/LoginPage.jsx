import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useAuth } from '../../contexts/AuthContext';

const demoAccount = {
  name: 'Demo Shopper',
  email: 'demo@flowzint.com',
  password: 'demo1234',
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const panelRef = useRef(null);
  const fieldRefs = useRef([]);
  const [form, setForm] = useState({ email: 'mira@example.com', password: 'demo-demo' });

  useLayoutEffect(() => {
    if (!panelRef.current) {
      return undefined;
    }

    gsap.fromTo(panelRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
    gsap.fromTo(fieldRefs.current, { y: 14, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.42, delay: 0.1 });
    return undefined;
  }, []);

  const submitForm = (event) => {
    event.preventDefault();
    login({ name: 'Mira', email: form.email });
    navigate('/', { replace: true });
  };

  const useDemoAccount = () => {
    setForm({ email: demoAccount.email, password: demoAccount.password });
    login({ name: demoAccount.name, email: demoAccount.email });
    navigate('/', { replace: true });
  };

  return (
    <main className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl place-items-center px-4 py-12 sm:px-6 lg:px-8">
      <section ref={panelRef} className="grid w-full gap-10 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-soft lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative overflow-hidden bg-gradient-to-br from-sage-200/20 via-slate-950 to-slate-900 p-8 lg:p-10">
          <div className="absolute inset-0 grain-overlay opacity-40" />
          <div className="relative max-w-md">
            <p className="text-xs uppercase tracking-[0.34em] text-sage-200">Welcome back</p>
            <h1 className="mt-4 text-4xl text-white">Log in to restore your routine, cart, and replenishment signals.</h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              The page uses staggered GSAP entry so the form feels like a premium onboarding moment.
            </p>
          </div>
        </div>

        <div className="p-8 lg:p-10">
          <form onSubmit={submitForm} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-slate-200">Email</label>
              <input
                ref={(element) => {
                  fieldRefs.current[0] = element;
                }}
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-sage-200/40"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-200">Password</label>
              <input
                ref={(element) => {
                  fieldRefs.current[1] = element;
                }}
                type="password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-sage-200/40"
              />
            </div>

            <button
              ref={(element) => {
                fieldRefs.current[2] = element;
              }}
              type="submit"
              className="w-full rounded-full bg-sage-200 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-white"
            >
              Sign in
            </button>

            <button
              type="button"
              onClick={useDemoAccount}
              className="w-full rounded-full border border-slate-300 bg-white px-6 py-4 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Use demo account
            </button>

            <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
              Demo account: <span className="font-semibold text-white">demo@flowzint.com</span> / <span className="font-semibold text-white">demo1234</span>
            </p>

            <p className="text-center text-sm text-slate-400">
              No account yet?{' '}
              <Link to="/auth/signup" className="font-semibold text-sage-200 transition hover:text-white">
                Create one
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}