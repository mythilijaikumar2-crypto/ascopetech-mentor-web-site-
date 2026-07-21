import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { authService } from "../../services/authService";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { toast } from "sonner";

export const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    setLoading(true);
    try {
      const user = await authService.register(name, email);
      register(user.name, user.email);
      toast.success("Account registered successfully! Welcome aboard.");
      navigate("/onboarding");
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-center sm:text-left">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Create your Account</h1>
        <p className="text-xs text-slate-500">Sign up in seconds to start building CVs and practicing mock interviews.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Full Name"
          id="name"
          placeholder="Jane Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Email Address"
          id="email"
          type="email"
          placeholder="jane@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-xs font-semibold text-slate-700">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 bg-white text-slate-900 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            placeholder="••••••••"
            required
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          isLoading={loading}
          className="w-full mt-2"
        >
          Create Account
        </Button>
      </form>

      <p className="text-center text-xs text-slate-500">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700">
          Sign in here
        </Link>
      </p>
    </div>
  );
};
export default Register;
