import React, { useState, useEffect } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import logoImage from "../../assets/assope tech.png";
import { Button } from "../common/Button";

interface IntroductionAnimationProps {
  onComplete: () => void;
}

export const IntroductionAnimation: React.FC<IntroductionAnimationProps> = ({
  onComplete,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // If the user prefers reduced motion or it has already played in this session, skip it
    const hasPlayed = sessionStorage.getItem("career_ai_intro_played");
    if (prefersReducedMotion || hasPlayed === "true") {
      onComplete();
      setIsVisible(false);
      return;
    }

    // Auto-complete intro after 2.2 seconds
    const timer = setTimeout(() => {
      handleComplete();
    }, 2200);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion, onComplete]);

  const handleComplete = () => {
    sessionStorage.setItem("career_ai_intro_played", "true");
    setIsVisible(false);
    onComplete();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -30, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } }}
          className="fixed inset-0 bg-slate-50 flex flex-col items-center justify-center z-50 p-6 overflow-hidden select-none"
        >
          {/* Skip Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleComplete}
            className="absolute top-6 right-6 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 shadow-xs transition-all"
          >
            Skip Intro
          </Button>

          {/* Content Box */}
          <div className="flex flex-col items-center gap-5 max-w-sm text-center relative z-10">
            {/* Standalone Logo Image (No Box Container) */}
            <m.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              src={logoImage}
              alt="Ascope Tech"
              className="h-20 md:h-24 w-auto object-contain drop-shadow-xs"
            />

            {/* Brand Title Reveal */}
            <m.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900"
            >
              Career<span className="text-primary-600">AI</span>
            </m.h1>

            {/* Tagline Reveal */}
            <m.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="text-xs md:text-sm font-medium text-slate-600 leading-relaxed text-balance"
            >
              Your intelligent partner for resume building, mock interviews, and personalized study roadmaps.
            </m.p>

            {/* Loading Line Progress Bar */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="w-44 h-1.5 bg-slate-200 rounded-full mt-3 overflow-hidden relative"
            >
              <m.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ repeat: Infinity, duration: 1.0, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-1/2 bg-primary-600 rounded-full"
              />
            </m.div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};


