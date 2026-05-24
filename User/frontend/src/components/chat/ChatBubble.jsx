import React from 'react';
import ProductCard from '../ui/ProductCard';

export default function ChatBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`chat-entry flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[92%] rounded-3xl border px-4 py-4 shadow-soft sm:max-w-[85%] ${
          isUser
            ? 'border-sage-200/30 bg-sage-200/10 text-white'
            : 'border-white/10 bg-white/5 text-slate-100'
        }`}
      >
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-slate-400">
          <span>{isUser ? 'You' : 'Flowzint AI'}</span>
          {message.tag ? (
            <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] text-slate-300">{message.tag}</span>
          ) : null}
        </div>

        {message.text ? <p className="mt-3 text-sm leading-7 text-inherit">{message.text}</p> : null}

        {message.recommendations?.length ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {message.recommendations.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}