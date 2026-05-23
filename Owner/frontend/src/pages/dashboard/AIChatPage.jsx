import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ChatBubble from "../../components/chat/ChatBubble";
import { chatMessages } from "../../data/mockData";

export default function AIChatPage() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".chat-row", {
        opacity: 0,
        y: 10,
        duration: 0.35,
        stagger: 0.05,
        ease: "power2.out"
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-slate-900">AI Business Chat</h2>
        <p className="text-sm text-slate-500">Ask for inventory insights, reorder suggestions, and sales analytics.</p>
      </div>

      <div className="h-[420px] space-y-3 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
        {chatMessages.map((message) => (
          <ChatBubble key={message.id} sender={message.sender} text={message.text} />
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Ask AI: Which items need immediate reorder?"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
        />
        <button className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500">
          Send
        </button>
      </div>
    </section>
  );
}
