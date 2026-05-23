export default function PublicFooter() {
  return (
    <footer
      id="contact"
      className="mt-10 grid gap-6 rounded-3xl border border-white/20 bg-slate-950/70 p-6 text-white backdrop-blur-xl md:grid-cols-3 md:p-8"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-200">FlowZint AI</p>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          A smart owner dashboard for stock automation, inventory visibility, and business analytics.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white">Quick Links</h3>
        <div className="mt-3 space-y-2 text-sm text-slate-300">
          <a href="#features" className="block transition hover:text-white">
            Features
          </a>
          <a href="#about" className="block transition hover:text-white">
            About
          </a>
          <a href="/login" className="block transition hover:text-white">
            Login
          </a>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white">Built for business owners</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Use the dashboard to monitor stock, trigger reorders, and make faster decisions with AI assistance.
        </p>
      </div>
    </footer>
  );
}
