import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ProductCard from '../components/ui/ProductCard';
import { categories, getRecommendedProducts, products } from '../data/mockData';

const vibes = {
  morning: {
    id: 'morning',
    label: 'Day Browse',
    eyebrow: 'Bright discovery and quick essentials',
    title: 'Start the day with a smarter marketplace.',
    copy:
      'An AI storefront that adapts to how you feel, then curates everything from home goods and wellness to beauty, tech, pantry basics, and daily essentials.',
    background:
      'linear-gradient(135deg, rgba(236, 253, 245, 0.95), rgba(248, 250, 252, 0.92), rgba(255, 255, 255, 0.94))',
    titleClass: 'text-slate-950',
    copyClass: 'text-slate-700',
    chipClass: 'border-slate-300 bg-white text-slate-900',
  },
  night: {
    id: 'night',
    label: 'Late Night',
    eyebrow: 'Moody search and smarter picks',
    title: 'Shift into a darker, slower shopping mode.',
    copy:
      'The interface deepens with the vibe state so the marketplace feels alive, cinematic, and responsive to the shopping journey.',
    background:
      'linear-gradient(135deg, rgba(2, 6, 23, 0.98), rgba(15, 23, 42, 0.94), rgba(30, 41, 59, 0.96))',
    titleClass: 'text-white',
    copyClass: 'text-slate-300',
    chipClass: 'border-white/10 bg-white/5 text-slate-100',
  },
};

export default function Home() {
  const [vibe, setVibe] = useState(vibes.morning);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const copyRef = useRef(null);
  const eyebrowRef = useRef(null);
  const productStripRef = useRef(null);

  useLayoutEffect(() => {
    if (!heroRef.current) {
      return undefined;
    }

    gsap.to(heroRef.current, {
      backgroundImage: vibe.background,
      duration: 0.7,
      ease: 'power2.out',
    });

    gsap.fromTo(
      [titleRef.current, copyRef.current, eyebrowRef.current],
      { y: 10, opacity: 0.7 },
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.04, ease: 'power2.out' },
    );
  }, [vibe]);

  useLayoutEffect(() => {
    if (!productStripRef.current) {
      return undefined;
    }

    const cards = productStripRef.current.querySelectorAll('.feature-card');
    if (cards.length) {
      gsap.fromTo(cards, { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 });
    }

    return undefined;
  }, []);

  const recommendedProducts = getRecommendedProducts();

  return (
    <main>
      <section
        ref={heroRef}
        className="relative overflow-hidden border-b border-white/5 bg-slate-950 transition-colors duration-500"
      >
        <div className="absolute inset-0 grain-overlay opacity-40" />
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-sage-200/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div
              ref={eyebrowRef}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] ${vibe.chipClass}`}
            >
              <span className="h-2 w-2 rounded-full bg-sage-300" />
              {vibe.eyebrow}
            </div>

            <h1 ref={titleRef} className={`mt-6 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl ${vibe.titleClass}`}>
              {vibe.title}
            </h1>

            <p ref={copyRef} className={`mt-6 max-w-2xl text-lg leading-8 ${vibe.copyClass}`}>
              {vibe.copy}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/concierge"
                className="rounded-full border border-slate-900/10 bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Try AI concierge
              </Link>
              <Link
                to={`/product/${products[0].id}`}
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
              >
                Explore products
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {Object.values(vibes).map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setVibe(option)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    vibe.id === option.id
                      ? 'border-slate-900/10 bg-slate-900 text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div ref={productStripRef} className="grid gap-4 self-end rounded-[2rem] border border-white/10 bg-slate-950/60 p-4 shadow-soft backdrop-blur-xl">
            {recommendedProducts.map((product, index) => (
              <div key={product.id} className="feature-card">
                <ProductCard product={product} compact={index !== 0} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-sage-200">Curated categories</p>
            <h2 className="mt-3 text-3xl text-white sm:text-4xl">A marketplace built around everyday needs, not one aisle.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            Each category is written like a smart retail department so the catalog feels premium, broad, and easy to browse during a hackathon demo.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <div key={category.id} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-soft">
              <p className="text-xs uppercase tracking-[0.28em] text-sage-200">{category.tone}</p>
              <h3 className="mt-4 text-2xl text-white">{category.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-soft sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-sage-200">Why it feels different</p>
              <h2 className="mt-4 text-3xl text-white sm:text-4xl">A conversational commerce layer that replaces stale search bars.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                The interface supports vibe shifts, auto-replenish nudges, bargaining, and chat-led product discovery across the kinds of products people actually need every day.
              </p>
              <Link
                to="/concierge"
                className="mt-6 inline-flex rounded-full border border-slate-900/10 bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Open AI concierge
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} compact />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}