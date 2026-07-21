import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { toast } from "sonner";

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      toast.success("Simulation: A password reset link has been dispatched to your email address!");
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-center sm:text-left">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Reset Password</h1>
        <p className="text-xs text-slate-500">Provide your account email and we'll dispatch a simulated reset link.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Email Address"
          id="email"
          type="email"
          placeholder="yourname@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="primary"
          isLoading={loading}
          className="w-full mt-2"
        >
          Send Reset Link
        </Button>
      </form>

      <p className="text-center text-xs text-slate-500">
        Remember your password?{" "}
        <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700">
          Login here
        </Link>
      </p>
    </div>
  );
};
export default ForgotPassword;
