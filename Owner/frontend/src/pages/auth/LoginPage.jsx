import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../components/ui/Toast";

export default function LoginPage() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const demoCreds = { email: "owner@demo.local", password: "demo123" };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".auth-item:not(.auth-cta)", {
        y: 14,
        opacity: 0,
        duration: 0.35,
        stagger: 0.06,
        ease: "power2.out"
      });
    }, formRef);
    return () => ctx.revert();
  }, []);

  const onFocus = (event) => {
    gsap.to(event.currentTarget, {
      boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.3)",
      duration: 0.3
    });
  };

  const onBlur = (event) => {
    gsap.to(event.currentTarget, {
      boxShadow: "0 0 0 0px rgba(99, 102, 241, 0)",
      duration: 0.3
    });
  };

  return (
    <div className="mesh-bg grid min-h-screen place-items-center p-6">
      <form
        ref={formRef}
        className="w-full max-w-md rounded-3xl border border-white/30 bg-white p-8 shadow-panel"
        onSubmit={(e) => {
          e.preventDefault();
          const user = auth.login({ email, name: email.split("@")[0] });
          toast.push(`Welcome back, ${user.name}`);
          const from = location.state?.from?.pathname || "/owner";
          navigate(from, { replace: true });
        }}
      >
        <h1 className="auth-item text-3xl font-semibold text-slate-900">Owner Login</h1>
        <p className="auth-item mt-2 text-sm text-slate-500">Sign in to your FlowZint business console.</p>

        <div className="auth-item mt-6 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Business email"
            onFocus={onFocus}
            onBlur={onBlur}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            onFocus={onFocus}
            onBlur={onBlur}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition"
          />
        </div>

        <button
          type="submit"
          className="auth-cta mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold shadow-sm transition"
          style={{ backgroundColor: "#4f46e5", color: "#ffffff", border: "1px solid #4338ca" }}
        >
          Login
        </button>

        <div className="auth-item mt-3 flex items-center justify-between gap-3 text-sm">
          <div className="text-slate-500">Demo: {demoCreds.email} / {demoCreds.password}</div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setEmail(demoCreds.email);
                setPassword(demoCreds.password);
                toast.push("Demo credentials filled");
              }}
              className="rounded-lg border border-slate-300 px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
            >
              Fill demo
            </button>
            <button
              type="button"
              onClick={() => {
                const user = auth.login({ email: demoCreds.email, name: "Demo Owner" });
                toast.push(`Logged in as ${user.name}`);
                navigate("/owner", { replace: true });
              }}
              className="rounded-lg bg-teal-700 px-3 py-1 text-xs font-semibold text-white hover:bg-teal-600"
            >
              Quick login
            </button>
          </div>
        </div>

        <p className="auth-item mt-4 text-sm text-slate-500">
          New here? <Link to="/signup" className="font-semibold text-indigo-600">Create account</Link>
        </p>
      </form>
    </div>
  );
}
