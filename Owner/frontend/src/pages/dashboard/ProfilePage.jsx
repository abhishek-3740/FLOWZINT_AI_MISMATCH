import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ProfilePage() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".profile-field", {
        opacity: 0,
        y: 12,
        duration: 0.35,
        stagger: 0.05,
        ease: "power2.out"
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
      <h2 className="profile-field text-2xl font-semibold text-slate-900">Owner Profile</h2>
      <p className="profile-field mb-6 text-sm text-slate-500">Update your personal and business account details.</p>

      <form className="grid gap-4 md:grid-cols-2">
        <input className="profile-field rounded-xl border border-slate-300 px-4 py-3" placeholder="Owner name" defaultValue="Arjun Patel" />
        <input className="profile-field rounded-xl border border-slate-300 px-4 py-3" placeholder="Business name" defaultValue="Patel Retail Co." />
        <input className="profile-field rounded-xl border border-slate-300 px-4 py-3" placeholder="Business email" defaultValue="owner@patelretail.com" />
        <input className="profile-field rounded-xl border border-slate-300 px-4 py-3" placeholder="Phone" defaultValue="+91 98765 43210" />
        <textarea
          className="profile-field min-h-28 rounded-xl border border-slate-300 px-4 py-3 md:col-span-2"
          placeholder="Business address"
          defaultValue="22 Market Street, Bengaluru"
        />
        <button type="button" className="profile-field w-fit rounded-xl bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-teal-400">
          Save Changes
        </button>
      </form>
    </section>
  );
}
