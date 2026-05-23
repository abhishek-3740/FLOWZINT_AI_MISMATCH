import React, { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((message, opts = {}) => {
    const id = Date.now() + Math.random().toString(36).slice(2, 8);
    const toast = { id, message, ...opts };
    setToasts((t) => [toast, ...t]);
    if (!opts.persistent) setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), opts.duration || 4000);
    return id;
  }, []);

  const remove = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  return (
    <ToastContext.Provider value={{ push, remove }}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex w-80 flex-col gap-3">
        {toasts.map((t) => (
          <div key={t.id} className="rounded-lg border border-slate-200 bg-white p-3 shadow-md">
            <div className="flex items-start justify-between gap-3">
              <div className="text-sm text-slate-800">{t.message}</div>
              <button onClick={() => remove(t.id)} className="text-xs text-slate-400 hover:text-slate-600">Dismiss</button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export default ToastProvider;
