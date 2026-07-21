import React from "react";
import { m } from "framer-motion";
import { Sparkles, Bot } from "lucide-react";

interface AiThinkingAnimationProps {
  label?: string;
  size?: "sm" | "md" | "lg";
}

export const AiThinkingAnimation: React.FC<AiThinkingAnimationProps> = ({
  label = "AI Thinking...",
  size = "md",
}) => {
  const isSm = size === "sm";
  const isLg = size === "lg";

  return (
    <div className={`flex items-center gap-3 ${isSm ? "p-2" : isLg ? "p-6" : "p-4"} rounded-2xl bg-primary-50/50 dark:bg-primary-950/30 border border-primary-100/60 dark:border-primary-900/40`}>
      <div className="relative flex items-center justify-center">
        <m.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className={`absolute rounded-full bg-linear-to-r from-primary-500 to-brand-500 blur-sm ${
            isSm ? "h-6 w-6" : isLg ? "h-12 w-12" : "h-9 w-9"
          }`}
        />
        <div className={`relative z-10 rounded-xl bg-linear-to-tr from-primary-600 to-brand-500 text-white flex items-center justify-center shadow-md ${
          isSm ? "h-6 w-6" : isLg ? "h-10 w-10" : "h-8 w-8"
        }`}>
          <Bot className={isSm ? "h-3.5 w-3.5" : isLg ? "h-6 w-6" : "h-4.5 w-4.5"} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <span className={`font-semibold text-slate-800 dark:text-slate-200 ${isSm ? "text-xs" : "text-sm"}`}>
            {label}
          </span>
          <Sparkles className="h-3.5 w-3.5 text-primary-500 animate-spin" />
        </div>

        <div className="flex gap-1 items-center">
          <m.div
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
            className="h-1.5 w-1.5 rounded-full bg-primary-500"
          />
          <m.div
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
            className="h-1.5 w-1.5 rounded-full bg-brand-500"
          />
          <m.div
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
            className="h-1.5 w-1.5 rounded-full bg-indigo-400"
          />
        </div>
      </div>
    </div>
  );
};
