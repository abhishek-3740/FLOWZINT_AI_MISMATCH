import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AutoReplenishToast({ open, onAdd, onDismiss }) {
  const toastRef = useRef(null);

  useLayoutEffect(() => {
    if (!open || !toastRef.current) {
      return undefined;
    }

    gsap.fromTo(
      toastRef.current,
      { x: 90, y: 26, opacity: 0, scale: 0.96 },
      {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.55,
        ease: 'power3.out',
      },
    );

    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      onDismiss();
    }, 7000);

    return () => window.clearTimeout(timer);
  }, [open, onDismiss]);

  if (!open) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 px-4 sm:bottom-6 sm:right-6">
      <div
        ref={toastRef}
        className="pointer-events-auto w-[calc(100vw-2rem)] max-w-sm rounded-3xl border border-white/10 bg-slate-950/95 p-4 text-slate-100 shadow-soft backdrop-blur-xl"
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-sage-400/15 text-sage-200">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
              <path
                d="M12 2c4 4 6 7 6 11a6 6 0 11-12 0c0-4 2-7 6-11z"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold tracking-wide text-sage-100">Smart replenishment</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Running low on your daily cleanser? Add to cart now for 5% off.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={onAdd}
                className="rounded-full bg-sage-200 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-white"
              >
                Add
              </button>
              <button
                type="button"
                onClick={onDismiss}
                className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/5"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}