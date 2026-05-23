export default function StatCard({ title, value, trend, tone }) {
  const toneMap = {
    emerald: "from-emerald-500/15 to-emerald-50 text-emerald-700",
    amber: "from-amber-500/15 to-amber-50 text-amber-700",
    indigo: "from-indigo-500/15 to-indigo-50 text-indigo-700",
    teal: "from-teal-500/15 to-teal-50 text-teal-700"
  };

  return (
    <article className="stat-card rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
      <p className="text-sm text-slate-500">{title}</p>
      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="text-3xl font-semibold text-slate-900">{value}</p>
        <span className={`rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold ${toneMap[tone]}`}>
          {trend}
        </span>
      </div>
    </article>
  );
}
