import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "neutral";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-full border tracking-wide uppercase";
  
  const variants = {
    primary: "bg-primary-50 border-primary-100 text-primary-700",
    secondary: "bg-brand-50 border-brand-100 text-brand-700",
    success: "bg-emerald-50 border-emerald-100 text-emerald-700",
    warning: "bg-amber-50 border-amber-100 text-amber-700",
    danger: "bg-red-50 border-red-100 text-red-700",
    info: "bg-blue-50 border-blue-100 text-blue-700",
    neutral: "bg-slate-50 border-slate-200/80 text-slate-600",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-0.8 text-[11px]",
  };

  return (
    <span
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {children}
    </span>
  );
};
