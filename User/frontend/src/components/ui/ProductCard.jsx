import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useCart } from '../../contexts/CartContext';

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export default function ProductCard({ product, compact = false }) {
  const { addToCart, getItemQuantity, updateQuantity } = useCart();
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const itemQuantity = getItemQuantity(product.id);

  useLayoutEffect(() => {
    if (!cardRef.current || !imageRef.current) {
      return undefined;
    }

    gsap.set(imageRef.current, { scale: 1.02 });
    return undefined;
  }, []);

  const handleHover = (isActive) => {
    if (!cardRef.current || !imageRef.current) {
      return;
    }

    gsap.to(cardRef.current, {
      y: isActive ? -8 : 0,
      scale: isActive ? 1.01 : 1,
      duration: 0.3,
      ease: 'power2.out',
    });

    gsap.to(imageRef.current, {
      scale: isActive ? 1.07 : 1.02,
      duration: 0.45,
      ease: 'power2.out',
    });
  };

  if (!product) {
    return null;
  }

  if (compact) {
    return (
      <div ref={cardRef} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-soft transition">
        <Link
          to={`/product/${product.id}`}
          className="group block"
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
          <div className="flex gap-3 p-3">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-slate-800">
              <img
                ref={imageRef}
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] uppercase tracking-[0.28em] text-sage-200">{product.category}</p>
              <h4 className="mt-1 truncate text-sm font-semibold text-white">{product.name}</h4>
              <p className="mt-1 text-xs text-slate-400">{formatPrice(product.price)}</p>
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                <span>{product.rating} / 5</span>
                <span className="text-sage-200 transition group-hover:text-white">View</span>
              </div>
            </div>
          </div>
        </Link>

        <div className="flex items-center justify-between gap-3 border-t border-white/10 px-3 py-3">
          <span className="text-xs uppercase tracking-[0.25em] text-slate-400">Quick add</span>
          {itemQuantity > 0 ? (
            <div className="inline-flex items-center rounded-full border border-white/10 bg-slate-950/70">
              <button
                type="button"
                onClick={() => updateQuantity(product.id, itemQuantity - 1)}
                className="px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/5"
                aria-label={`Decrease quantity of ${product.name}`}
              >
                -
              </button>
              <span className="min-w-8 px-3 py-2 text-center text-sm font-semibold text-white">{itemQuantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(product.id, itemQuantity + 1)}
                className="px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/5"
                aria-label={`Increase quantity of ${product.name}`}
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="rounded-full bg-sage-200 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-white"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div ref={cardRef} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-soft transition">
      <Link
        to={`/product/${product.id}`}
        className="group block"
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <img ref={imageRef} src={product.image} alt={product.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-100 backdrop-blur">
            {product.category}
          </div>
        </div>

        <div className="space-y-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-white">{product.name}</h3>
              <p className="mt-1 text-sm text-slate-400">{product.description}</p>
            </div>
            <div className="rounded-2xl bg-sage-200/10 px-3 py-2 text-right">
              <p className="text-xs uppercase tracking-[0.24em] text-sage-200">Price</p>
              <p className="mt-1 text-base font-semibold text-white">{formatPrice(product.price)}</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Rating {product.rating}</span>
            <span>{product.reviewsCount} reviews</span>
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-4">
        <span className="text-xs uppercase tracking-[0.25em] text-slate-400">Add this item</span>
        {itemQuantity > 0 ? (
          <div className="inline-flex items-center rounded-full border border-white/10 bg-slate-950/70">
            <button
              type="button"
              onClick={() => updateQuantity(product.id, itemQuantity - 1)}
              className="px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/5"
              aria-label={`Decrease quantity of ${product.name}`}
            >
              -
            </button>
            <span className="min-w-8 px-3 py-2 text-center text-sm font-semibold text-white">{itemQuantity}</span>
            <button
              type="button"
              onClick={() => updateQuantity(product.id, itemQuantity + 1)}
              className="px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/5"
              aria-label={`Increase quantity of ${product.name}`}
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="rounded-full bg-sage-200 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-white"
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}