import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral" | "gradient";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}) => {
  const base = "inline-flex items-center justify-center font-extrabold rounded-full border tracking-wider uppercase";

  const variants: Record<string, string> = {
    /* Primary — uses palette accent */
    primary:
      "[background-color:var(--bg-section)] [border-color:var(--border-color)] [color:var(--color-primary)] dark:bg-blue-950/60 dark:border-blue-800 dark:text-blue-300",
    secondary:
      "[background-color:var(--bg-card)] [border-color:var(--border-color)] [color:var(--color-accent)] dark:bg-indigo-950/50 dark:border-indigo-800 dark:text-indigo-300",
    success:
      "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-300",
    warning:
      "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/50 dark:border-amber-800 dark:text-amber-300",
    danger:
      "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/50 dark:border-red-800 dark:text-red-300",
    info:
      "bg-sky-50 border-sky-200 text-sky-700 dark:bg-sky-950/50 dark:border-sky-800 dark:text-sky-300",
    neutral:
      "[background-color:var(--bg-surface)] [border-color:var(--border-subtle)] [color:var(--text-muted)]",
    gradient:
      "bg-gradient-to-r from-[#5b8dee] to-[#abc4ff] text-white border-transparent [box-shadow:0_2px_8px_rgba(91,141,238,0.3)]",
  };

  const sizes: Record<string, string> = {
    sm: "px-2 py-0.5 text-[9px]",
    md: "px-2.5 py-1 text-[10px]",
  };

  return (
    <span className={twMerge(clsx(base, variants[variant], sizes[size], className))} {...props}>
      {children}
    </span>
  );
};
