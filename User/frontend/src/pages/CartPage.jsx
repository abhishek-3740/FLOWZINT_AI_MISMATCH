import React, { useLayoutEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useCart } from '../contexts/CartContext';

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export default function CartPage() {
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const { cartItems, subtotal, shipping, total, updateQuantity, removeFromCart } = useCart();

  useLayoutEffect(() => {
    if (!pageRef.current) {
      return undefined;
    }

    gsap.fromTo(pageRef.current.querySelectorAll('.cart-reveal'), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06 });
    return undefined;
  }, [cartItems.length]);

  return (
    <main ref={pageRef} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="cart-reveal mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-sage-200">Cart</p>
          <h1 className="mt-3 text-4xl text-white sm:text-5xl">Review items before checkout.</h1>
        </div>
        <Link to="/shop" className="text-sm text-sage-200 transition hover:text-white">
          Continue shopping
        </Link>
      </div>

      {!cartItems.length ? (
        <section className="cart-reveal rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-soft">
          <h2 className="text-2xl text-white">Your cart is empty</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">Add something from the shop or use the add-to-cart button on a product detail page.</p>
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="mt-6 rounded-full bg-sage-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
          >
            Start shopping
          </button>
        </section>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="space-y-4">
            {cartItems.map((item) => (
              <article key={item.product.id} className="cart-reveal rounded-[1.75rem] border border-white/10 bg-white/5 p-4 shadow-soft sm:p-5">
                <div className="flex gap-4">
                  <img src={item.product.image} alt={item.product.name} className="h-24 w-24 rounded-2xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-sage-200">{item.product.category}</p>
                        <h2 className="mt-2 text-xl text-white">{item.product.name}</h2>
                        <p className="mt-2 text-sm leading-7 text-slate-400">{item.product.description}</p>
                      </div>

                      <p className="text-lg font-semibold text-white">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center rounded-full border border-white/10 bg-slate-950/70">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-4 py-2 text-sm text-white transition hover:bg-white/5"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 text-sm text-slate-300">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-4 py-2 text-sm text-white transition hover:bg-white/5"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:text-white"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="cart-reveal rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-soft h-fit">
            <h2 className="text-2xl text-white">Order summary</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <div className="flex items-center justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex items-center justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
              <div className="flex items-center justify-between border-t border-white/10 pt-4 text-base font-semibold text-white"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="mt-6 w-full rounded-full bg-sage-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
            >
              Checkout
            </button>

            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="mt-3 w-full rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
            >
              Add more items
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}