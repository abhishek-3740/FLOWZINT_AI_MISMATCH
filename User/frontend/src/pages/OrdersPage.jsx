import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useCart } from '../contexts/CartContext';

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export default function OrdersPage() {
  const pageRef = useRef(null);
  const { orders } = useCart();

  useLayoutEffect(() => {
    if (!pageRef.current) {
      return undefined;
    }

    gsap.fromTo(pageRef.current.querySelectorAll('.order-card'), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06 });
    return undefined;
  }, [orders.length]);

  return (
    <main ref={pageRef} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-sage-200">Orders</p>
        <h1 className="mt-3 text-4xl text-white sm:text-5xl">Your recent orders and receipts.</h1>
      </div>

      {!orders.length ? (
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-soft">
          <h2 className="text-2xl text-white">No orders yet</h2>
          <p className="mt-3 text-sm text-slate-400">Checkout will create an order here.</p>
          <Link to="/shop" className="mt-6 inline-flex rounded-full bg-sage-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white">
            Shop now
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            (() => {
              const tracking = order.tracking ?? {
                trackingNumber: 'Pending',
                status: 'Processing',
              };

              return (
            <article key={order.id} className="order-card rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-soft">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-sage-200">{new Date(order.createdAt).toLocaleString()}</p>
                  <h2 className="mt-2 text-2xl text-white">Order {order.id}</h2>
                  <p className="mt-2 text-sm text-slate-400">{order.items.length} items shipped to {order.customerInfo.address}, {order.customerInfo.city}</p>
                  <p className="mt-2 text-sm text-slate-400">Tracking: {tracking.trackingNumber}</p>
                </div>
                <div className="rounded-2xl bg-slate-950/70 px-4 py-3 text-right">
                  <p className="text-xs uppercase tracking-[0.24em] text-sage-200">Total</p>
                  <p className="mt-1 text-xl font-semibold text-white">{formatPrice(order.total)}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {order.items.map((item) => (
                  <div key={item.product.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                    <p className="font-semibold text-white">{item.product.name}</p>
                    <p className="mt-1 text-sm text-slate-400">Qty {item.quantity}</p>
                    <p className="mt-2 text-sm text-sage-200">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to={`/track/${order.id}`}
                  className="rounded-full bg-sage-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
                >
                  Track package
                </Link>
                <span className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-300">
                  {tracking.status}
                </span>
              </div>
            </article>
              );
            })()
          ))}
        </div>
      )}
    </main>
  );
}