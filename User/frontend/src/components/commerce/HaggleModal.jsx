import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function createCounterOffer(productPrice, userOffer) {
  if (userOffer >= productPrice * 0.97) {
    return `Accepted. I can release it for ${formatPrice(userOffer)} with the current batch.`;
  }

  if (userOffer >= productPrice * 0.9) {
    return `Close. I can meet you at ${formatPrice(productPrice * 0.92)} and keep the bundle priority.`;
  }

  if (userOffer >= productPrice * 0.82) {
    return `I can counter at ${formatPrice(productPrice * 0.89)} if you add a second item today.`;
  }

  return `That is below my floor. Best counter is ${formatPrice(productPrice * 0.93)} with free shipping.`;
}

export default function HaggleModal({ open, product, onClose }) {
  const modalRef = useRef(null);
  const listRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [offer, setOffer] = useState('');

  useEffect(() => {
    if (!open || !product) {
      return;
    }

    setMessages([
      {
        role: 'assistant',
        text: `I can negotiate on ${product.name}. Make your first offer and I will counter with live pricing logic.`,
      },
    ]);
    setOffer('');
  }, [open, product]);

  useLayoutEffect(() => {
    if (!open || !modalRef.current) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        modalRef.current,
        { y: 28, scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.42, ease: 'power3.out' },
      );
    }, modalRef);

    return () => ctx.revert();
  }, [open]);

  useEffect(() => {
    if (!open || !listRef.current) {
      return;
    }

    const latestEntry = listRef.current.querySelector('.chat-entry:last-child');

    if (latestEntry) {
      gsap.fromTo(latestEntry, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 });
    }
  }, [messages, open]);

  if (!open || !product) {
    return null;
  }

  const submitOffer = () => {
    const parsedOffer = Number.parseFloat(offer);

    if (Number.isNaN(parsedOffer)) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      { role: 'user', text: `Would you take ${formatPrice(parsedOffer)}?` },
      { role: 'assistant', text: createCounterOffer(product.price, parsedOffer) },
    ]);
    setOffer('');
  };

  const offerButtons = [0.88, 0.92, 0.96].map((ratio) => Math.round(product.price * ratio * 100) / 100);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/75 px-4 py-4 backdrop-blur-sm sm:items-center">
      <button type="button" className="absolute inset-0 cursor-default" aria-label="Close overlay" onClick={onClose} />

      <div
        ref={modalRef}
        className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-soft"
      >
        <div className="border-b border-white/5 bg-white/5 px-5 py-4 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-sage-200">Negotiate Price</p>
              <h2 className="mt-2 text-2xl text-white">HaggleBot for {product.name}</h2>
              <p className="mt-1 text-sm text-slate-400">Current price {formatPrice(product.price)}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition hover:border-white/20 hover:bg-white/5"
              aria-label="Close modal"
            >
              <span className="text-xl leading-none">&times;</span>
            </button>
          </div>
        </div>

        <div ref={listRef} className="max-h-[52vh] space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`chat-entry flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-3xl px-4 py-3 text-sm leading-7 ${
                  message.role === 'user'
                    ? 'bg-sage-200 text-slate-950'
                    : 'border border-white/10 bg-white/5 text-slate-100'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 border-t border-white/5 bg-slate-950/95 px-5 py-5 sm:px-6">
          <div className="flex flex-wrap gap-2">
            {offerButtons.map((quickOffer) => (
              <button
                key={quickOffer}
                type="button"
                onClick={() => setOffer(String(quickOffer))}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-sage-200/30 hover:bg-sage-200/10"
              >
                {formatPrice(quickOffer)}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="number"
              step="0.01"
              value={offer}
              onChange={(event) => setOffer(event.target.value)}
              placeholder="Enter your offer"
              className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sage-200/40"
            />
            <button
              type="button"
              onClick={submitOffer}
              className="rounded-2xl bg-sage-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
            >
              Send offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}