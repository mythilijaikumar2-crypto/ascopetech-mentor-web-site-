import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { authService } from "../../services/authService";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { LogIn, HelpCircle } from "lucide-react";
import { toast } from "sonner";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/candidate/dashboard";

  const handleMockFill = (role: "candidate" | "admin") => {
    if (role === "candidate") {
      setEmail("candidate@careerai.com");
      setPassword("candidate123");
    } else {
      setEmail("admin@careerai.com");
      setPassword("admin123");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    try {
      const user = await authService.login(email, password);
      login(user.email, user.role, user.name);
      toast.success(`Welcome back, ${user.name}!`);
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        const redirectToGoal = (location.state as any)?.redirectToGoal;
        if (redirectToGoal) {
          navigate(`/careers/${redirectToGoal}`);
        } else {
          navigate(from);
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6" style={{ color: "var(--text-paragraph)" }}>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black tracking-tight" style={{ color: "var(--text-heading)" }}>
          Access CareerAI
        </h1>
        <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          Enter your details to access your personalized mentor dashboard.
        </p>
      </div>

      {/* Demo Notice */}
      <div
        className="p-3.5 rounded-xl flex items-start gap-2.5"
        style={{ backgroundColor: "var(--bg-section)", border: "1px solid var(--border-color)" }}
      >
        <HelpCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" style={{ color: "var(--color-primary)" }} />
        <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-title)" }}>
          <strong>DEMO MODE:</strong> All calculations run locally. Use the quick-fill credentials below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Email Address"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="candidate@careerai.com"
          required
        />
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="text-xs font-extrabold tracking-wide" style={{ color: "var(--text-title)" }}>
              Password
            </label>
            <Link to="/forgot-password" className="text-[10px] font-extrabold hover:underline" style={{ color: "var(--color-primary)" }}>
              Forgot?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="theme-input w-full px-4 py-2.5 text-sm"
            placeholder="••••••••"
            required
          />
        </div>

        <Button type="submit" variant="primary" isLoading={loading} className="w-full mt-2 py-3" leftIcon={<LogIn className="h-4 w-4" />}>
          Sign In
        </Button>
      </form>

      {/* Quick Fill */}
      <div className="flex flex-col gap-2.5 pt-4" style={{ borderTop: "1px solid var(--divider-color)" }}>
        <span className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
          Quick-Fill Credentials
        </span>
        <div className="flex gap-2.5">
          {[
            { role: "candidate" as const, label: "Candidate User" },
            { role: "admin" as const, label: "System Admin" },
          ].map(({ role, label }) => (
            <button
              key={role}
              type="button"
              onClick={() => handleMockFill(role)}
              className="flex-1 px-3 py-2 rounded-xl text-left transition-all duration-250"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)"; }}
            >
              <p className="text-[11px] font-extrabold" style={{ color: "var(--text-title)" }}>{label}</p>
              <p className="text-[9px] mt-0.5" style={{ color: "var(--text-muted)" }}>Click to autofill</p>
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-xs font-medium" style={{ color: "var(--text-muted)" }}>
        Don't have an account?{" "}
        <Link to="/register" className="font-extrabold hover:underline" style={{ color: "var(--color-primary)" }}>
          Register here
        </Link>
      </p>
    </div>
  );
};
export default Login;
