import React from "react";
import { m } from "framer-motion";
import { cardHover } from "../../animations/variants";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "glass" | "interactive" | "flat" | "accent" | "elevated";
  isHoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = "default",
  isHoverable = false,
  ...props
}) => {
  const base = "rounded-2xl transition-all duration-250";

  const variants: Record<string, string> = {
    /* Uses --bg-card (#c1d3fe in light, #111827 in dark) */
    default:
      "[background-color:var(--bg-card)] [border:1px_solid_var(--border-color)] [box-shadow:var(--shadow-sm)] [color:var(--text-title)]",

    /* Transparent outline */
    outline:
      "bg-transparent [border:1.5px_solid_var(--border-color)] [color:var(--text-title)]",

    /* Glassmorphism */
    glass:
      "glass-card [color:var(--text-title)]",

    /* Interactive — lighter surface, lifts on hover */
    interactive:
      "[background-color:var(--bg-surface)] [border:1px_solid_var(--border-subtle)] hover:[border-color:var(--color-primary)] hover:[box-shadow:var(--shadow-lg)] transition-all duration-250 cursor-pointer [color:var(--text-title)]",

    /* Flat — section level */
    flat:
      "[background-color:var(--bg-section)] border-transparent [color:var(--text-title)]",

    /* Accent — left border stripe */
    accent:
      "[background-color:var(--bg-card)] [border:1px_solid_var(--border-color)] border-l-4 [border-l-color:var(--color-primary)] [box-shadow:var(--shadow-md)] [color:var(--text-title)]",

    /* Elevated — highest card surface (#abc4ff in light) */
    elevated:
      "[background-color:var(--bg-card-elevated)] [border:1px_solid_var(--border-color)] [box-shadow:var(--shadow-md)] [color:var(--text-heading)]",
  };

  if (isHoverable) {
    return (
      <m.div
        variants={cardHover}
        initial="initial"
        whileHover="hover"
        className={twMerge(clsx(base, variants[variant], className))}
        {...props}
      >
        {children}
      </m.div>
    );
  }

  return (
    <div className={twMerge(clsx(base, variants[variant], className))} {...props}>
      {children}
    </div>
  );
};
