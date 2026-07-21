import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { authService } from "../../services/authService";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { Badge } from "../../components/common/Badge";
import { LogIn, HelpCircle } from "lucide-react";
import { toast } from "sonner";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect target
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
      
      // If redirection target is saved target
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
    <div className="flex flex-col gap-6 text-slate-900 dark:text-slate-100">
      <div className="flex flex-col gap-1 text-center sm:text-left">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Access CareerAI</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Enter your details to access your personalized mentor dashboard.</p>
      </div>

      {/* Disclaimer */}
      <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 rounded-xl flex items-start gap-2.5">
        <HelpCircle className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-blue-900 dark:text-blue-200 leading-relaxed">
          <strong>DEMO MODE:</strong> All calculations run locally in the browser. Please use the quick-fill credentials below to sign in.
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
            <label htmlFor="password" className="text-xs font-bold text-slate-800 dark:text-slate-200">Password</label>
            <Link to="/forgot-password" className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700">
              Forgot?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs"
            placeholder="••••••••"
            required
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          isLoading={loading}
          className="w-full mt-2 py-3"
          leftIcon={<LogIn className="h-4 w-4" />}
        >
          Sign In
        </Button>
      </form>

      {/* Quick Fill Pills */}
      <div className="flex flex-col gap-2.5 pt-4 border-t border-slate-200 dark:border-slate-800">
        <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Quick-Fill Credentials</span>
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => handleMockFill("candidate")}
            className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl text-left transition-colors"
          >
            <p className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200">Candidate User</p>
            <p className="text-[9px] text-slate-400 dark:text-slate-400 mt-0.5">Click to autofill</p>
          </button>
          <button
            type="button"
            onClick={() => handleMockFill("admin")}
            className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl text-left transition-colors"
          >
            <p className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200">System Admin</p>
            <p className="text-[9px] text-slate-400 dark:text-slate-400 mt-0.5">Click to autofill</p>
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
        Don't have an account?{" "}
        <Link to="/register" className="font-extrabold text-blue-600 dark:text-blue-400 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
};
export default Login;
