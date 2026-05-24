import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useCart } from '../contexts/CartContext';

function formatDateTime(value) {
  return new Date(value).toLocaleString();
}

export default function PackageTrackingPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const { orders } = useCart();

  const order = useMemo(() => orders.find((entry) => entry.id === orderId), [orders, orderId]);

  useLayoutEffect(() => {
    if (!pageRef.current) {
      return undefined;
    }

    gsap.fromTo(
      pageRef.current.querySelectorAll('.track-reveal'),
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
    );
    return undefined;
  }, [orderId]);

  if (!order) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-soft">
          <h1 className="text-3xl text-white">Tracking page not found</h1>
          <p className="mt-3 text-sm text-slate-400">That order was not found in your local order history.</p>
          <button
            type="button"
            onClick={() => navigate('/orders')}
            className="mt-6 rounded-full bg-sage-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
          >
            Back to orders
          </button>
        </div>
      </main>
    );
  }

  const tracking = order.tracking ?? {
    status: 'Processing',
    carrier: 'Flowzint Express',
    trackingNumber: order.id,
    expectedDelivery: order.createdAt,
    currentStage: 0,
    milestones: [
      { label: 'Order confirmed', completed: true, time: order.createdAt, detail: 'Order received and queued for fulfillment.' },
      { label: 'Packed', completed: false, time: order.createdAt, detail: 'Your package is waiting to be packed.' },
      { label: 'Shipped', completed: false, time: order.createdAt, detail: 'Shipment will appear here once dispatched.' },
      { label: 'Out for delivery', completed: false, time: order.createdAt, detail: 'Courier tracking will update here.' },
      { label: 'Delivered', completed: false, time: order.createdAt, detail: 'Delivery confirmation will appear here.' },
    ],
  };
  const progressPercent = Math.round((tracking.currentStage / (tracking.milestones.length - 1)) * 100);

  return (
    <main ref={pageRef} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="track-reveal mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-sage-200">Package tracking</p>
          <h1 className="mt-3 text-4xl text-white sm:text-5xl">Your package is on the way.</h1>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
          <p className="font-semibold text-white">{tracking.carrier}</p>
          <p>Tracking #{tracking.trackingNumber}</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="track-reveal rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-sage-200">Current status</p>
              <h2 className="mt-2 text-3xl text-white">{tracking.status}</h2>
              <p className="mt-2 text-sm text-slate-400">Estimated delivery: {formatDateTime(tracking.expectedDelivery)}</p>
            </div>
            <div className="rounded-full border border-sage-200/30 bg-sage-200/10 px-4 py-3 text-right">
              <p className="text-xs uppercase tracking-[0.24em] text-sage-200">Progress</p>
              <p className="mt-1 text-2xl font-semibold text-white">{progressPercent}%</p>
            </div>
          </div>

          <div className="mt-8 h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-sage-200" style={{ width: `${progressPercent}%` }} />
          </div>

          <div className="mt-8 space-y-5">
            {tracking.milestones.map((milestone, index) => (
              <div key={milestone.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                      milestone.completed ? 'bg-sage-200 text-slate-950' : 'border border-white/10 bg-slate-950 text-slate-400'
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < tracking.milestones.length - 1 ? <div className="mt-2 h-full w-px flex-1 bg-white/10" /> : null}
                </div>

                <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg font-semibold text-white">{milestone.label}</h3>
                    <span className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      {milestone.completed ? 'Completed' : index === tracking.currentStage ? 'Next' : 'Pending'}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{milestone.detail}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-500">{formatDateTime(milestone.time)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="track-reveal space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-soft h-fit">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-sage-200">Order details</p>
            <h2 className="mt-2 text-2xl text-white">{order.id}</h2>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-center justify-between gap-4"><span>Placed</span><span>{formatDateTime(order.createdAt)}</span></div>
            <div className="flex items-center justify-between gap-4"><span>Deliver to</span><span className="text-right">{order.customerInfo.address}, {order.customerInfo.city}</span></div>
            <div className="flex items-center justify-between gap-4"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
            <h3 className="text-lg font-semibold text-white">Items in this shipment</h3>
            <div className="mt-4 space-y-3">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <img src={item.product.image} alt={item.product.name} className="h-14 w-14 rounded-2xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-white">{item.product.name}</p>
                    <p className="text-sm text-slate-400">Qty {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/orders" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10">
              Back to orders
            </Link>
            <Link to="/shop" className="rounded-full bg-sage-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white">
              Shop more
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}