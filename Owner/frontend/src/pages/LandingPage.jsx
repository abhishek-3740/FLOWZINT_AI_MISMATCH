import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import PublicFooter from "../components/public/PublicFooter";
import PublicNavbar from "../components/public/PublicNavbar";

export default function LandingPage() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 24,
        opacity: 0,
        duration: 0.45,
        stagger: 0.08,
        ease: "power2.out"
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="mesh-bg min-h-screen p-6 md:p-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col justify-between rounded-[2rem] border border-white/30 bg-white/10 p-8 backdrop-blur-xl md:p-12">
        <div className="hero-reveal">
          <PublicNavbar />
        </div>

        <section className="my-10 max-w-3xl" id="about">
          <p className="hero-reveal mb-4 text-xs uppercase tracking-[0.3em] text-teal-200">AI-Powered Commerce Control</p>
          <h2 className="hero-reveal text-4xl font-semibold leading-tight text-white md:text-6xl">
            Run inventory, reorder stock, and scale faster with one autonomous AI workspace.
          </h2>
          <p className="hero-reveal mt-6 text-lg text-slate-200">
            Built for business owners who need sharp analytics and instant stock decisions without manual overhead.
          </p>
          <div className="hero-reveal mt-8 flex gap-3">
            <Link
              to="/signup"
              className="rounded-xl bg-teal-400 px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-teal-300"
            >
              Get Started
            </Link>
            <Link
              to="/owner"
              className="rounded-xl border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-slate-900"
            >
              Preview Dashboard
            </Link>
          </div>
        </section>

        <section className="hero-reveal grid gap-4 md:grid-cols-3" id="features">
          {[
            "AI stock monitoring with reorder triggers",
            "Actionable business analytics in real time",
            "Owner-first dashboard built for speed"
          ].map((feature) => (
            <article key={feature} className="rounded-2xl border border-white/30 bg-white/10 p-4 text-white">
              <p className="text-sm">{feature}</p>
            </article>
          ))}
        </section>

        <div className="hero-reveal">
          <PublicFooter />
        </div>
      </div>
    </div>
  );
}
