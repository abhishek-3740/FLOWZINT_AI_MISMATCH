import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { gsap } from "gsap";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout() {
  const containerRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".owner-shell", {
        opacity: 0,
        y: 16,
        duration: 0.4,
        ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen p-4 md:p-6">
      <div className="owner-shell mx-auto flex w-full max-w-[1400px] flex-col gap-4 md:flex-row">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
        <main className="w-full rounded-3xl bg-slate-100/95 p-4 backdrop-blur md:p-6">
          <Topbar />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
