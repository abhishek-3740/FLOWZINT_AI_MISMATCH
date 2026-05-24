import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ProductCard from '../components/ui/ProductCard';
import { products } from '../data/mockData';

export default function ShopPage() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    if (!pageRef.current) {
      return undefined;
    }

    gsap.fromTo(pageRef.current.querySelectorAll('.shop-reveal'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 });
    return undefined;
  }, []);

  return (
    <main ref={pageRef} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="shop-reveal mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-sage-200">Shop all</p>
          <h1 className="mt-3 text-4xl text-white sm:text-5xl">Browse the full marketplace.</h1>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-slate-400">
          Quick add works from every product card here, and each item still opens a full detail page for deeper shopping.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="shop-reveal">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </main>
  );
}