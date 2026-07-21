import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Sparkles, MessageSquareQuote } from "lucide-react";
import logoImage from "../assets/assope tech.png";
import { ThemeToggle } from "../components/common/ThemeToggle";

export const AuthLayout: React.FC = () => {
  return (
    <div
      className="min-h-screen grid grid-cols-1 lg:grid-cols-12 transition-colors duration-250"
      style={{ backgroundColor: "var(--bg-background)", color: "var(--text-paragraph)" }}
    >
      {/* Visual Showcase - Side Section */}
      <div
        className="hidden lg:flex lg:col-span-5 flex-col justify-between p-12 relative overflow-hidden"
        style={{ backgroundColor: "#0d1b3e" }}
      >
        {/* Glow overlays */}
        <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: "rgba(91,141,238,0.12)" }} />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full blur-[100px] pointer-events-none" style={{ backgroundColor: "rgba(171,196,255,0.08)" }} />

        {/* Brand logo */}
        <div className="flex items-center justify-between z-10 w-full">
          <Link to="/" className="flex items-center gap-2.5 max-w-fit">
            <img src={logoImage} alt="Ascope Tech" className="h-12 md:h-14 w-auto object-contain saturate-150 contrast-125 brightness-110 drop-shadow-md" />
          </Link>
        </div>

        {/* Hero message */}
        <div className="my-auto flex flex-col gap-6 z-10 max-w-sm">
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "rgba(91,141,238,0.15)", border: "1px solid rgba(171,196,255,0.25)" }}
          >
            <Sparkles className="h-5 w-5" style={{ color: "#abc4ff" }} />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Accelerate your career goals with artificial intelligence
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(193,211,254,0.85)" }}>
            Get personalized resume scoring, practice behavioral questions with instant feedback, and discover matching roles.
          </p>
        </div>

        {/* Testimonial */}
        <div
          className="z-10 max-w-sm flex flex-col gap-3 p-5 rounded-2xl backdrop-blur-md"
          style={{ backgroundColor: "rgba(91,141,238,0.1)", border: "1px solid rgba(171,196,255,0.2)" }}
        >
          <div className="flex items-center gap-1.5" style={{ color: "#fbbf24" }}>
            <MessageSquareQuote className="h-5 w-5" />
          </div>
          <p className="text-xs italic leading-relaxed" style={{ color: "rgba(193,211,254,0.9)" }}>
            "I practiced for my React Developer interview on CareerAI. The instant scoring and sample answers helped me land my dream role at SaaSify!"
          </p>
          <div className="flex items-center gap-3 mt-1">
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: "rgba(91,141,238,0.3)", border: "1px solid rgba(171,196,255,0.3)" }}
            >
              AM
            </div>
            <div>
              <p className="text-xs font-bold text-white">Alex Mercer</p>
              <p className="text-[10px]" style={{ color: "rgba(171,196,255,0.6)" }}>Frontend Engineer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div
        className="lg:col-span-7 flex flex-col items-center justify-center p-8 relative"
        style={{ backgroundColor: "var(--bg-section)" }}
      >
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>
        <div
          className="w-full max-w-md p-8 rounded-3xl shadow-xl transition-colors duration-250"
          style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-xl)" }}
        >
          {/* Logo on mobile */}
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
