import { notifications } from "../../data/mockData";

export default function Topbar() {
  return (
    <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-panel md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Owner Dashboard</p>
        <h2 className="text-xl font-semibold text-slate-900">Welcome back, Arjun Patel</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 lg:block">
          {notifications[0]}
        </div>
        <button className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:border-teal-300 hover:text-teal-600">
          3 Notifications
        </button>
        <div className="flex items-center gap-2 rounded-full bg-slate-100 p-1 pr-3">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-teal-500 text-xs font-bold text-white">AP</div>
          <span className="text-sm font-medium text-slate-700">Owner</span>
        </div>
      </div>
    </header>
  );
}
