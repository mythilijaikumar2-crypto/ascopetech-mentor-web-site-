import React from "react";
import { m } from "framer-motion";
import { cardHover } from "../../animations/variants";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "glass" | "interactive" | "flat" | "accent";
  isHoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = "default",
  isHoverable = false,
  ...props
}) => {
  const baseStyles = "rounded-2xl border transition-all duration-250";
  
  const variants = {
    default: "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-sm text-slate-900 dark:text-slate-100",
    outline: "bg-transparent border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100",
    glass: "glass-card text-slate-900 dark:text-slate-100",
    interactive: "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-400/50 shadow-sm hover:shadow-lg transition-all duration-250 cursor-pointer text-slate-900 dark:text-slate-100",
    flat: "bg-slate-100/70 dark:bg-slate-950/60 border-transparent text-slate-900 dark:text-slate-100",
    accent: "bg-white dark:bg-slate-900 border-l-4 border-l-blue-500 border-slate-200/80 dark:border-slate-800 shadow-md text-slate-900 dark:text-slate-100",
  };

  if (isHoverable) {
    return (
      <m.div
        variants={cardHover}
        initial="initial"
        whileHover="hover"
        className={twMerge(clsx(baseStyles, variants[variant], className))}
        {...props}
      >
        {children}
      </m.div>
    );
  }

  return (
    <div
      className={twMerge(clsx(baseStyles, variants[variant], className))}
      {...props}
    >
      {children}
    </div>
  );
};
