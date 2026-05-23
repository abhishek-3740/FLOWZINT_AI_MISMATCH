import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const statusStyle = {
  "In Stock": "bg-emerald-100 text-emerald-700",
  Low: "bg-amber-100 text-amber-700",
  "Out of Stock": "bg-rose-100 text-rose-700"
};

export default function ProductDetailModal({ item, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".detail-pop", {
        opacity: 0,
        y: 12,
        duration: 0.35,
        stagger: 0.05,
        ease: "power2.out"
      });
    }, modalRef);

    return () => ctx.revert();
  }, []);

  if (!item) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div ref={modalRef} className="detail-pop relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
          aria-label="Close product details"
        >
          ×
        </button>

        <div className="grid gap-0 md:grid-cols-[1.05fr_1.35fr]">
          <div className="relative min-h-[280px] bg-slate-100">
            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[item.status]}`}>{item.status}</span>
              <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">{item.category}</span>
            </div>
          </div>

          <div className="space-y-5 p-6 md:p-8">
            <div className="detail-pop">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">{item.id}</p>
              <h3 className="mt-1 text-3xl font-semibold text-slate-900">{item.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
            </div>

            <div className="detail-pop grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Price</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">${item.price.toFixed(2)}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Rating</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{item.rating}/5</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Supplier</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{item.supplier}</p>
              </div>
            </div>

            <div className="detail-pop rounded-2xl border border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Supplier contact</p>
              <div className="mt-3 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
                <a href={`mailto:${item.supplierEmail}`} className="rounded-xl bg-slate-50 px-4 py-3 transition hover:bg-slate-100">
                  <span className="block text-xs uppercase tracking-[0.18em] text-slate-400">Email</span>
                  <span className="mt-1 block font-semibold text-slate-900">{item.supplierEmail}</span>
                </a>
                <a href={`tel:${item.supplierPhone}`} className="rounded-xl bg-slate-50 px-4 py-3 transition hover:bg-slate-100">
                  <span className="block text-xs uppercase tracking-[0.18em] text-slate-400">Phone</span>
                  <span className="mt-1 block font-semibold text-slate-900">{item.supplierPhone}</span>
                </a>
                <a href={item.purchaseLink} target="_blank" rel="noreferrer" className="rounded-xl bg-slate-50 px-4 py-3 transition hover:bg-slate-100">
                  <span className="block text-xs uppercase tracking-[0.18em] text-slate-400">Purchase link</span>
                  <span className="mt-1 block truncate font-semibold text-slate-900">Open order page</span>
                </a>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <a href={`mailto:${item.supplierEmail}`} className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500">
                  Send message
                </a>
                <a href={`tel:${item.supplierPhone}`} className="rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-600">
                  Call supplier
                </a>
                <a href={item.purchaseLink} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400">
                  Order stock items
                </a>
              </div>
            </div>

            <div className="detail-pop rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">AI generated reply</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{item.aiReply}</p>
            </div>

            <div className="detail-pop grid gap-3 sm:grid-cols-3">
              {item.attributes.map((attribute) => (
                <div key={attribute} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
                  {attribute}
                </div>
              ))}
            </div>

            <div className="detail-pop rounded-2xl border border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Customer reviews</p>
              <div className="mt-3 space-y-3">
                {item.reviews.map((review) => (
                  <div key={review.name} className="rounded-xl bg-slate-50 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-900">{review.name}</p>
                      <p className="text-xs font-semibold text-amber-500">{review.rating}/5</p>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
