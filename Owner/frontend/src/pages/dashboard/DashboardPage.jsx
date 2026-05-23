import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import StatCard from "../../components/common/StatCard";
import { metrics, reorderOpportunities, sales30Days } from "../../data/mockData";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip
} from "recharts";

function SalesChart() {
  const [range, setRange] = useState("30d");
  const [customActive, setCustomActive] = useState(false);
  const today = new Date();
  const earliest = new Date();
  earliest.setDate(today.getDate() - (sales30Days.length - 1));
  const dateStrings = sales30Days.map((_, i) => {
    const d = new Date(earliest);
    d.setDate(earliest.getDate() + i);
    return d.toISOString().slice(0, 10);
  });
  const [customStart, setCustomStart] = useState(dateStrings[0]);
  const [customEnd, setCustomEnd] = useState(dateStrings[dateStrings.length - 1]);

  // helpers to synthesize monthly/yearly series from the daily mock
  const avg = (arr) => arr.reduce((s, x) => s + x, 0) / arr.length;

  const makeMonthly = () => {
    // generate 12 monthly points based on daily average with some deterministic variation
    const base = Math.round(avg(sales30Days) * 30);
    return Array.from({ length: 12 }).map((_, i) => {
      const season = Math.sin((i / 12) * Math.PI * 2) * 0.12; // seasonal variation
      const trend = 1 + i * 0.02; // slight growth
      const value = Math.round(base * (trend + season));
      return { label: new Date(0, i).toLocaleString(undefined, { month: "short" }), value };
    });
  };

  const makeYearly = () => {
    // generate 5 yearly points based on daily average aggregated
    const baseYear = Math.round(avg(sales30Days) * 365);
    return Array.from({ length: 5 }).map((_, i) => {
      const trend = 1 + i * 0.06; // multi-year growth
      const cyc = Math.cos(i) * 0.04;
      const value = Math.round(baseYear * (trend + cyc));
      return { label: `${new Date().getFullYear() - (4 - i)}`, value };
    });
  };

  const currencyFormatter = (v) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);

  // build data based on selected range
  let data = [];
  let title = "Sales Trend (Last 30 Days)";
  if (range === "30d") {
    data = sales30Days.map((v, i) => ({ label: `Day ${i + 1}`, value: v }));
    title = "Sales Trend (Last 30 Days)";
  } else if (range === "12m") {
    data = makeMonthly();
    title = "Sales Trend (Last 12 Months)";
  } else if (range === "5y") {
    data = makeYearly();
    title = "Sales Trend (Last 5 Years)";
  } else if (range === "custom") {
    // clamp custom dates to available mock range
    const s = new Date(customStart);
    const e = new Date(customEnd);
    if (s > e) {
      // swap
      const tmp = new Date(s);
      s.setTime(e.getTime());
      e.setTime(tmp.getTime());
    }
    const idx = (d) => Math.round((d - earliest) / (1000 * 60 * 60 * 24));
    const si = Math.max(0, Math.min(sales30Days.length - 1, idx(s)));
    const ei = Math.max(0, Math.min(sales30Days.length - 1, idx(e)));
    const slice = sales30Days.slice(si, ei + 1);
    data = slice.map((v, i) => {
      const d = new Date(earliest);
      d.setDate(d.getDate() + si + i);
      return { label: d.toLocaleDateString(undefined), value: v };
    });
    title = `Sales Trend (${new Date(customStart).toLocaleDateString()} — ${new Date(customEnd).toLocaleDateString()})`;
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <div className="inline-flex rounded-md shadow-sm" role="tablist" aria-label="timeframe switch">
            <button onClick={() => setRange("30d")} className={`px-3 py-1 text-xs font-semibold ${range === "30d" ? "bg-slate-900 text-white rounded-md" : "bg-white text-slate-600 border"}`}>
              30d
            </button>
            <button onClick={() => setRange("12m")} className={`px-3 py-1 text-xs font-semibold ${range === "12m" ? "bg-slate-900 text-white rounded-md" : "bg-white text-slate-600 border"}`}>
              12m
            </button>
            <button onClick={() => setRange("5y")} className={`px-3 py-1 text-xs font-semibold ${range === "5y" ? "bg-slate-900 text-white rounded-md" : "bg-white text-slate-600 border"}`}>
              5y
            </button>
          </div>
        </div>
        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">Updated 2m ago</span>
      </div>
          <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 24, left: 8, bottom: 8 }}>
            <defs>
              <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.06} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#e6eef8" vertical={false} />
            <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#475569", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#475569", fontSize: 12 }} tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v)} />
            <ReTooltip labelFormatter={() => ""} formatter={(val) => currencyFormatter(val)} />
            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3, strokeWidth: 1, stroke: "#fff" }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {customActive && range === "custom" && (
        <div className="mt-3 flex gap-2 items-center">
          <label className="text-sm text-slate-600">From</label>
          <input type="date" value={customStart} onChange={(e) => setCustomStart(e.target.value)} min={dateStrings[0]} max={dateStrings[dateStrings.length - 1]} className="border rounded px-2 py-1" />
          <label className="text-sm text-slate-600">To</label>
          <input type="date" value={customEnd} onChange={(e) => setCustomEnd(e.target.value)} min={dateStrings[0]} max={dateStrings[dateStrings.length - 1]} className="border rounded px-2 py-1" />
          <button onClick={() => setRange("custom")} className="ml-2 px-3 py-1 bg-slate-900 text-white rounded">Apply</button>
        </div>
      )}
    </section>
  );
}

export default function DashboardPage() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-card", {
        y: 14,
        opacity: 0,
        duration: 0.4,
        stagger: 0.07,
        ease: "power2.out"
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="space-y-5">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <StatCard key={metric.id} {...metric} />
        ))}
      </section>
      <SalesChart />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Restock Opportunities</h3>
            <p className="text-sm text-slate-500">AI-ranked items that need action from the owner or supplier workflow.</p>
          </div>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">Autonomy enabled</span>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {reorderOpportunities.map((item) => (
            <article key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{item.urgency}</p>
                  <h4 className="mt-1 text-base font-semibold text-slate-900">{item.name}</h4>
                </div>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">{item.margin} margin</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-white p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Current qty</p>
                  <p className="mt-1 font-semibold text-slate-900">{item.qty}</p>
                </div>
                <div className="rounded-xl bg-white p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Suggested order</p>
                  <p className="mt-1 font-semibold text-slate-900">{item.suggestedOrder}</p>
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-500">Supplier: {item.supplier}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
