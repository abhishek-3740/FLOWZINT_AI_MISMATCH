import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ChatBubble from '../components/chat/ChatBubble';
import { getRecommendedProducts, products } from '../data/mockData';

const initialMessages = [
  {
    role: 'assistant',
    tag: 'Search replacement',
    text: 'Tell me the routine, skin concern, vibe, or budget and I will build the basket for you.',
  },
  {
    role: 'user',
    text: 'I need a beginner apartment setup.',
  },
  {
    role: 'assistant',
    tag: 'Starter stack',
    text:
      'Start with a desk light, an organizer, and a comfort item. That keeps the setup easy, visible, and useful from day one.',
    recommendations: [products[0], products[1], products[2]],
  },
];

function buildReply(query) {
  const normalized = query.toLowerCase();

  if (normalized.includes('beginner') && normalized.includes('apartment')) {
    return {
      tag: 'Starter stack',
      text:
        'I would keep it to three moves: light, organize, and comfort. That gives a polished setup without turning shopping into homework.',
      recommendations: [products[0], products[1], products[2]],
    };
  }

  if (normalized.includes('night')) {
    return {
      tag: 'Night mood',
      text:
        'For a slower evening setup, I would go heavier on comfort and keep the picks cozy so the experience feels restorative.',
      recommendations: [products[4], products[2], products[5]],
    };
  }

  return {
    tag: 'Curated by AI',
    text:
      'I can tailor that into a bundle. I am scanning the marketplace for the closest match and a clean value stack.',
    recommendations: getRecommendedProducts(),
  };
}

export default function AIConcierge() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const listRef = useRef(null);
  const panelRef = useRef(null);

  useLayoutEffect(() => {
    if (!panelRef.current) {
      return undefined;
    }

    gsap.fromTo(panelRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' });
    return undefined;
  }, []);

  useEffect(() => {
    if (!listRef.current) {
      return;
    }

    listRef.current.scrollTop = listRef.current.scrollHeight;
    const latestEntry = listRef.current.querySelector('.chat-entry:last-child');

    if (latestEntry) {
      gsap.fromTo(latestEntry, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 });
    }
  }, [messages]);

  const sendMessage = () => {
    const cleanedInput = input.trim();

    if (!cleanedInput) {
      return;
    }

    const reply = buildReply(cleanedInput);

    setMessages((currentMessages) => [
      ...currentMessages,
      { role: 'user', text: cleanedInput },
      { role: 'assistant', ...reply },
    ]);
    setInput('');
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <section ref={panelRef} className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-soft">
        <div className="border-b border-white/5 bg-white/5 px-5 py-5 sm:px-6">
          <p className="text-xs uppercase tracking-[0.34em] text-sage-200">Conversational commerce</p>
          <h1 className="mt-3 text-4xl text-white sm:text-5xl">AI concierge replaces search with a guided conversation.</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
            Ask for a room setup, a gift, a work-from-home kit, or a bundle and the conversation returns text plus mini product cards inside the chat.
          </p>
        </div>

        <div ref={listRef} className="max-h-[62vh] space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
          {messages.map((message, index) => (
            <ChatBubble key={`${message.role}-${index}`} message={message} />
          ))}
        </div>

        <div className="border-t border-white/5 bg-slate-950/95 px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-3 rounded-[1.75rem] border border-white/10 bg-white/5 p-4 sm:flex-row">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask for a beginner apartment setup, a night reset, or a smart bundle"
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-slate-950/80 px-5 py-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sage-200/40"
            />
            <button
              type="button"
              onClick={sendMessage}
              className="rounded-full bg-sage-200 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-white"
            >
              Send
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}