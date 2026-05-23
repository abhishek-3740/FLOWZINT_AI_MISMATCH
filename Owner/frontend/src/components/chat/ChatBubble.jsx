export default function ChatBubble({ sender, text }) {
  const isUser = sender === "user";

  return (
    <div className={`chat-row flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed md:max-w-[70%] ${
          isUser
            ? "rounded-br-md bg-indigo-600 text-white"
            : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
        }`}
      >
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] opacity-70">{isUser ? "Owner" : "AI Agent"}</p>
        <p>{text}</p>
      </div>
    </div>
  );
}
