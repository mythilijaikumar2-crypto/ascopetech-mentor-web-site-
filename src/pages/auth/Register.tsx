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
    <div className="flex flex-col gap-6" style={{ color: "var(--text-paragraph)" }}>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black tracking-tight" style={{ color: "var(--text-heading)" }}>
          Create your Account
        </h1>
        <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          Sign up in seconds to start building CVs and practising mock interviews.
        </p>
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
          <label htmlFor="password" className="text-xs font-extrabold tracking-wide" style={{ color: "var(--text-title)" }}>
            Password
          </label>
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

        <Button type="submit" variant="primary" isLoading={loading} className="w-full mt-2 py-3">
          Create Account
        </Button>
      </form>

      <p className="text-center text-xs font-medium" style={{ color: "var(--text-muted)" }}>
        Already have an account?{" "}
        <Link to="/login" className="font-extrabold hover:underline" style={{ color: "var(--color-primary)" }}>
          Sign in here
        </Link>
      </p>
    </div>
  );
};
export default Register;
