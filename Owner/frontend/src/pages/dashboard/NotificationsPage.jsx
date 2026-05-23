import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { getLocal, setLocal } from "../../utils/storage";

const initialNotifications = [
  {
    id: 1,
    title: "Critical stock alert",
    summary: "Organic Matcha Pack dropped below the reorder threshold and needs attention today.",
    details: "AI recommends an immediate reorder of 60 units to avoid a 7-day stockout window.",
    tag: "Urgent",
    tone: "rose",
    category: "stock",
    time: "2m ago",
    read: false
  },
  {
    id: 2,
    title: "AI reorder draft ready",
    summary: "The AI created 2 reorder drafts for your low inventory items with suggested quantities.",
    details: "Drafts include supplier links, estimated budgets, and recommended delivery dates.",
    tag: "AI Action",
    tone: "teal",
    category: "ai",
    time: "14m ago",
    read: false
  },
  {
    id: 3,
    title: "Weekly report generated",
    summary: "Your latest analytics report is ready with sales, category movement, and restock trends.",
    details: "The report shows beverages outpacing accessories by 18% this week.",
    tag: "Report",
    tone: "indigo",
    category: "report",
    time: "42m ago",
    read: true
  },
  {
    id: 4,
    title: "New low-stock items",
    summary: "Three products became low stock in the last hour and were flagged by the monitoring agent.",
    details: "Cold Brew Filter Kit, Vanilla Syrup Bottle, and Smart Thermal Mug are trending low.",
    tag: "Monitor",
    tone: "amber",
    category: "stock",
    time: "1h ago",
    read: true
  }
];

const filters = [
  { label: "All", value: "all" },
  { label: "Unread", value: "unread" },
  { label: "Stock", value: "stock" },
  { label: "AI", value: "ai" },
  { label: "Reports", value: "report" }
];

export default function NotificationsPage() {
  const ref = useRef(null);
  const [items, setItems] = useState(() => getLocal("notifications", initialNotifications));
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".notification-card", {
        opacity: 0,
        y: 12,
        duration: 0.35,
        stagger: 0.06,
        ease: "power2.out"
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const toneMap = {
    rose: "bg-rose-50 text-rose-700 border-rose-200",
    teal: "bg-teal-50 text-teal-700 border-teal-200",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200"
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (filter === "all") return true;
      if (filter === "unread") return !item.read;
      return item.category === filter;
    });
  }, [filter, items]);

  const unreadCount = items.filter((item) => !item.read).length;

  const activeNotification = filteredItems.find((item) => item.id === expandedId) || filteredItems[0] || null;

  const markRead = (id) => {
    setItems((current) => {
      const updated = current.map((item) => (item.id === id ? { ...item, read: true } : item));
      setLocal("notifications", updated);
      return updated;
    });
  };

  const dismissNotification = (id) => {
    setItems((current) => {
      const updated = current.filter((item) => item.id !== id);
      setLocal("notifications", updated);
      return updated;
    });
    if (expandedId === id) {
      setExpandedId(null);
    }
  };

  const markAllRead = () => {
    setItems((current) => {
      const updated = current.map((item) => ({ ...item, read: true }));
      setLocal("notifications", updated);
      return updated;
    });
  };

  return (
    <section ref={ref} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Notifications</h2>
          <p className="text-sm text-slate-500">Interact with stock alerts, AI actions, and reports from one place.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={markAllRead} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400">
            Mark all read
          </button>
          <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            {unreadCount} unread
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              filter === item.value
                ? "bg-slate-900 text-white"
                : "border border-slate-300 bg-white text-slate-600 hover:border-slate-400"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          {filteredItems.length ? (
            filteredItems.map((item) => (
              <article
                key={item.id}
                className={`notification-card cursor-pointer rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:shadow-lg ${
                  expandedId === item.id ? "border-slate-900 shadow-lg" : "border-slate-200"
                } ${item.read ? "bg-white" : "bg-slate-50"}`}
                onClick={() => setExpandedId(item.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                      {!item.read ? <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" /> : null}
                    </div>
                    <p className="mt-1 text-sm leading-6 text-slate-500">{item.summary}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span>{item.time}</span>
                      <span>•</span>
                      <span>{item.category.toUpperCase()}</span>
                    </div>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${toneMap[item.tone]}`}>{item.tag}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      markRead(item.id);
                    }}
                    className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 hover:border-slate-400"
                  >
                    Mark read
                  </button>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      dismissNotification(item.id);
                    }}
                    className="rounded-lg border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                  >
                    Dismiss
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="notification-card rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
              No notifications match the current filter.
            </div>
          )}
        </div>

        <aside className="notification-card rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Live Feed</h3>
          {activeNotification ? (
            <div className="mt-4 space-y-4 rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">{activeNotification.title}</h4>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{activeNotification.details}</p>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${toneMap[activeNotification.tone]}`}>{activeNotification.tag}</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  onClick={() => markRead(activeNotification.id)}
                  className="rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                  Mark as read
                </button>
                <button
                  onClick={() => dismissNotification(activeNotification.id)}
                  className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400"
                >
                  Dismiss
                </button>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                Interactivity example: click a notification to expand it, then use the action buttons to manage it.
              </div>
            </div>
          ) : (
            <div className="mt-4 rounded-2xl bg-white p-4 text-sm text-slate-500 shadow-sm">
              Select a notification to view details.
            </div>
          )}

          <div className="mt-4 space-y-3">
            {notifications.map((item, index) => (
              <button
                key={item}
                type="button"
                className="flex w-full items-center gap-2 rounded-xl bg-white p-3 text-left text-sm text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                onClick={() => {
                  setFilter(index % 2 === 0 ? "stock" : "ai");
                  if (filteredItems[0]) {
                    setExpandedId(filteredItems[0].id);
                  }
                }}
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                  {index + 1}
                </span>
                <span className="line-clamp-2">{item}</span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}