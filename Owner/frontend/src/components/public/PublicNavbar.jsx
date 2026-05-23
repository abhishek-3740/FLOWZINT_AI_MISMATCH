import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <header className="flex flex-col gap-4 rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between md:p-5">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-teal-200">FlowZint AI</p>
        <h1 className="mt-1 text-xl font-bold tracking-wide text-white">AI E-Commerce Management Platform</h1>
      </div>

      <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-white/90">
        <a href="#features" className="rounded-full px-4 py-2 transition hover:bg-white/10">
          Features
        </a>
        <a href="#about" className="rounded-full px-4 py-2 transition hover:bg-white/10">
          About
        </a>
        <a href="#contact" className="rounded-full px-4 py-2 transition hover:bg-white/10">
          Contact
        </a>
        <Link
          to="/login"
          className="rounded-full border border-white/30 bg-white px-4 py-2 text-slate-900 transition hover:bg-teal-100"
        >
          Sign In
        </Link>
      </nav>
    </header>
  );
}
