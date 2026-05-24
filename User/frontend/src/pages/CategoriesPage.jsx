import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { categories } from '../data/mockData';

export default function CategoriesPage() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    if (!pageRef.current) {
      return undefined;
    }

    gsap.fromTo(pageRef.current.querySelectorAll('.category-card'), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.08 });
    return undefined;
  }, []);

  return (
    <main ref={pageRef} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-8 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-sage-200">Categories</p>
        <h1 className="mt-3 text-4xl text-white sm:text-5xl">Browse by department, mood, or use case.</h1>
        <p className="mt-4 text-sm leading-7 text-slate-400">
          These are the main shopping lanes in the marketplace, from everyday self-care to home care, electronics, and bundles.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => (
          <article key={category.id} className="category-card rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.28em] text-sage-200">{category.tone}</p>
            <h2 className="mt-4 text-2xl text-white">{category.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">{category.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}