import { NavLink } from "react-router-dom";

function DashboardIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 13.5V20h6v-6.5H4Zm10 0V20h6v-6.5h-6ZM4 4v6.5h6V4H4Zm10 0v6.5h6V4h-6Z" fill="currentColor" />
    </svg>
  );
}

function InventoryIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 21v-8.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 7.5 12 12l8-4.5" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function ChatIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 5.5h14v10H9.2L5 19.5v-14Z" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function TruckIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3.5 7.5h11v8h-11v-8Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M14.5 10h3.2l2.3 2.3V15.5h-5.5V10Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M6.5 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="currentColor" />
    </svg>
  );
}

function ClipboardIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M9 4.5h6a1.5 1.5 0 0 1 1.5 1.5v1H7.5V6A1.5 1.5 0 0 1 9 4.5Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7 6.5h10A1.5 1.5 0 0 1 18.5 8v10A1.5 1.5 0 0 1 17 19.5H7A1.5 1.5 0 0 1 5.5 18V8A1.5 1.5 0 0 1 7 6.5Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8.5 11h7M8.5 14h5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M15 17.5H9m9-2.5H6l1.5-2.1V10a4.5 4.5 0 1 1 9 0v2.9L18 15Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 19.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ProfileIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm7 8a7 7 0 1 0-14 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SettingsIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 8.3a3.7 3.7 0 1 0 3.7 3.7A3.7 3.7 0 0 0 12 8.3Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="m19 12-.9-.5a6.9 6.9 0 0 0 0-1l.9-.5a1.7 1.7 0 0 0 .6-2.3l-1.1-1.9a1.7 1.7 0 0 0-2.1-.7l-1 .4a7 7 0 0 0-.8-.5L14.4 3a1.7 1.7 0 0 0-1.7-1.4h-2.4A1.7 1.7 0 0 0 8.6 3l-.2 1.1a7 7 0 0 0-.8.5l-1-.4a1.7 1.7 0 0 0-2.1.7l-1.1 1.9A1.7 1.7 0 0 0 4 10l.9.5a6.9 6.9 0 0 0 0 1L4 12a1.7 1.7 0 0 0-.6 2.3l1.1 1.9a1.7 1.7 0 0 0 2.1.7l1-.4c.25.2.53.38.8.5L8.6 18a1.7 1.7 0 0 0 1.7 1.4h2.4a1.7 1.7 0 0 0 1.7-1.4l.2-1.1c.28-.12.55-.3.8-.5l1 .4a1.7 1.7 0 0 0 2.1-.7l1.1-1.9A1.7 1.7 0 0 0 19 12Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function labelsClass(collapsed) {
  return collapsed ? "sr-only" : "";
}

const navItems = [
  { name: "Dashboard", to: "/owner", icon: DashboardIcon },
  { name: "Inventory", to: "/owner/inventory", icon: InventoryIcon },
  { name: "Suppliers", to: "/owner/suppliers", icon: TruckIcon },
  { name: "Orders", to: "/owner/orders", icon: ClipboardIcon },
  { name: "AI Chat", to: "/owner/ai-chat", icon: ChatIcon },
  { name: "Notifications", to: "/owner/notifications", icon: BellIcon },
  { name: "Profile", to: "/owner/profile", icon: ProfileIcon },
  { name: "Settings", to: "/owner/settings", icon: SettingsIcon }
];

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside
      className={`mesh-bg flex w-full flex-col rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl transition-all duration-300 md:min-h-[calc(100vh-3rem)] ${
        collapsed ? "md:w-24" : "md:w-72"
      }`}
    >
      <div className="mb-8 rounded-2xl bg-slate-950/80 p-4 text-white shadow-panel">
        <div className="flex items-start justify-between gap-3">
          <div className={labelsClass(collapsed)}>
            <p className="text-xs uppercase tracking-[0.25em] text-teal-300">FlowZint AI</p>
            <h1 className="mt-2 text-xl font-semibold">Owner Console</h1>
          </div>
          <button
            type="button"
            onClick={onToggle}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <span className="text-lg leading-none">{collapsed ? "›" : "‹"}</span>
          </button>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/owner"}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white text-slate-900 shadow-panel"
                  : "text-slate-200 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            <span className={labelsClass(collapsed)}>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
