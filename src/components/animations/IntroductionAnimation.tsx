import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import logoImage from "../../assets/assope tech.png";
import loadingVideo from "../../assets/loadingpageascopetech.mp4";
import { Button } from "../common/Button";

interface IntroductionAnimationProps {
  onComplete: () => void;
}

export const IntroductionAnimation: React.FC<IntroductionAnimationProps> = ({
  onComplete,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [videoDuration, setVideoDuration] = useState<number>(3.5);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // If the user prefers reduced motion or it has already played in this session, skip it
    const hasPlayed = sessionStorage.getItem("career_ai_intro_played");
    if (prefersReducedMotion || hasPlayed === "true") {
      onComplete();
      setIsVisible(false);
      return;
    }

    // Fallback timer in case video fails to fire onEnded
    const fallbackTimer = setTimeout(() => {
      handleComplete();
    }, (videoDuration + 0.5) * 1000);

    return () => clearTimeout(fallbackTimer);
  }, [prefersReducedMotion, videoDuration, onComplete]);

  const handleComplete = () => {
    sessionStorage.setItem("career_ai_intro_played", "true");
    setIsVisible(false);
    onComplete();
  };

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const duration = e.currentTarget.duration;
    if (duration && !isNaN(duration) && duration > 0) {
      setVideoDuration(duration);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } }}
          className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50 p-6 overflow-hidden select-none"
        >
          {/* Full Screen Loading Background Video matched to video duration */}
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleComplete}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-90 transition-opacity duration-300"
          >
            <source src={loadingVideo} type="video/mp4" />
          </video>

          {/* Dark Glass Backdrop Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-slate-950/80 pointer-events-none z-0" />

          {/* Skip Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleComplete}
            className="absolute top-6 right-6 text-white hover:text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-white/20 backdrop-blur-md shadow-lg transition-all z-20 font-semibold text-xs"
          >
            Skip Intro
          </Button>

          {/* Content Box */}
          <div className="flex flex-col items-center gap-5 max-w-sm text-center relative z-10 p-8 rounded-3xl bg-slate-900/75 backdrop-blur-md border border-white/15 shadow-2xl">
            {/* Standalone Logo Image */}
            <m.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              src={logoImage}
              alt="Ascope Tech"
              className="h-20 md:h-24 w-auto object-contain saturate-150 contrast-125 brightness-110 drop-shadow-lg"
            />

            {/* Brand Title Reveal */}
            <m.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-md"
            >
              Career<span className="text-primary-400">AI</span>
            </m.h1>

            {/* Tagline Reveal */}
            <m.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="text-xs md:text-sm font-medium text-slate-200 leading-relaxed text-balance"
            >
              Your intelligent partner for resume building, mock interviews, and personalized study roadmaps.
            </m.p>

            {/* Loading Line Progress Bar synced to video duration */}
            <div className="w-48 h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden relative border border-white/10">
              <m.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: videoDuration, ease: "linear" }}
                className="h-full bg-gradient-to-r from-primary-500 to-brand-400 rounded-full shadow-md"
              />
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};
