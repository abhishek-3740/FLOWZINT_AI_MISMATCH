import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../components/ui/Toast";

export default function SignupPage() {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const auth = useAuth();
  const toast = useToast();
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.35)",
      duration: 0.3
    });
  };

  const onBlur = (event) => {
    gsap.to(event.currentTarget, {
      boxShadow: "0 0 0 0px rgba(20, 184, 166, 0)",
      duration: 0.3
    });
  };

  return (
    <div className="mesh-bg grid min-h-screen place-items-center p-6">
      <form
        ref={formRef}
        className="w-full max-w-lg rounded-3xl border border-white/30 bg-white p-8 shadow-panel"
        onSubmit={(e) => {
          e.preventDefault();
          const user = auth.login({ email, name: name || email.split("@")[0] });
          toast.push(`Welcome, ${user.name}! Account created.`);
          navigate("/owner", { replace: true });
        }}
      >
        <h1 className="auth-item text-3xl font-semibold text-slate-900">Create Owner Account</h1>
        <p className="auth-item mt-2 text-sm text-slate-500">Start automating inventory and decisions with AI.</p>

        <div className="auth-item mt-6 grid gap-4 md:grid-cols-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Owner name"
            onFocus={onFocus}
            onBlur={onBlur}
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none"
          />
          <input
            type="text"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            required
            placeholder="Business name"
            onFocus={onFocus}
            onBlur={onBlur}
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Business email"
            onFocus={onFocus}
            onBlur={onBlur}
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none md:col-span-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            onFocus={onFocus}
            onBlur={onBlur}
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none"
          />
          <input
            type="password"
            required
            placeholder="Confirm password"
            onFocus={onFocus}
            onBlur={onBlur}
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none"
          />
        </div>

        <button
          type="submit"
          className="auth-cta mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold shadow-sm transition"
          style={{ backgroundColor: "#0f766e", color: "#ffffff", border: "1px solid #115e59" }}
        >
          Create Account
        </button>

        <p className="auth-item mt-4 text-sm text-slate-500">
          Already have an account? <Link to="/login" className="font-semibold text-teal-700">Login</Link>
        </p>
      </form>
    </div>
  );
}
