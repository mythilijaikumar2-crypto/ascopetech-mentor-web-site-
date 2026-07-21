import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Compass, Sparkles, MessageSquareQuote } from "lucide-react";
import logoImage from "../assets/assope tech.png";
export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white">
      {/* Visual Showcase - Side Section (Hidden on mobile) */}
      <div className="hidden lg:flex lg:col-span-5 bg-slate-950 flex-col justify-between p-12 relative overflow-hidden">
        {/* Subtle decorative glow overlays */}
        <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-primary-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-brand-500/10 blur-[100px] pointer-events-none" />

        {/* Brand logo link */}
        <Link to="/" className="flex items-center gap-2.5 z-10 max-w-fit">
          <img src={logoImage} alt="Ascope Tech" className="h-12 md:h-14 w-auto object-contain saturate-150 contrast-125 brightness-110 drop-shadow-md" />
        </Link>

        {/* Center message visual */}
        <div className="my-auto flex flex-col gap-6 z-10 max-w-sm">
          <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-primary-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">
            Accelerate your career goals with artificial intelligence
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Get personalized resume scoring, practice behavioral questions with instant feedback, and discover matching roles.
          </p>
        </div>

        {/* Small testimonial card at the bottom */}
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl z-10 backdrop-blur-md max-w-sm flex flex-col gap-3">
          <div className="flex items-center gap-1.5 text-amber-500">
            <MessageSquareQuote className="h-5 w-5" />
          </div>
          <p className="text-xs italic text-slate-300 leading-relaxed">
            \"I practiced for my React Developer interview on CareerAI. The instant scoring and sample answers helped me land my dream role at SaaSify!\"
          </p>
          <div className="flex items-center gap-3 mt-1">
            <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-semibold text-white">
              AM
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Alex Mercer</p>
              <p className="text-[10px] text-slate-500">Frontend Engineer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form content container */}
      <div className="lg:col-span-7 flex items-center justify-center p-8 bg-slate-50/50">
        <div className="w-full max-w-md bg-white border border-slate-100 p-8 rounded-2xl shadow-sm">
          {/* Logo showing only on mobile screens */}
          <div className="flex lg:hidden justify-center mb-8">
            <Link to="/">
              <img src={logoImage} alt="Ascope Tech" className="h-12 w-auto object-contain saturate-150 contrast-125 brightness-110 drop-shadow-md" />
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
