import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { Compass, HelpCircle } from "lucide-react";

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-primary-650/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-brand-500/10 blur-[100px] pointer-events-none" />

      <div className="flex flex-col items-center gap-6 max-w-md relative z-10">
        <div className="h-16 w-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-primary-400">
          <Compass className="h-9 w-9 animate-spin" style={{ animationDuration: "10s" }} />
        </div>

        <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-lg font-bold">Lost in Career Space?</h2>
        <p className="text-xs text-slate-400 leading-relaxed text-balance">
          The page you are looking for does not exist or has been moved. Use the button below to return to familiar territory.
        </p>

        <Link to="/" className="mt-4">
          <Button variant="primary" leftIcon={<HelpCircle className="h-4.5 w-4.5" />}>
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
