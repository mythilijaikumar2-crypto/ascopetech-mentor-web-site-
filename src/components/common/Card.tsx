import React from "react";
import { m } from "framer-motion";
import { cardHover } from "../../animations/variants";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "glass" | "interactive" | "flat";
  isHoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = "default",
  isHoverable = false,
  ...props
}) => {
  const baseStyles = "rounded-2xl border transition-colors";
  
  const variants = {
    default: "bg-white border-slate-100 shadow-sm shadow-slate-100/50",
    outline: "bg-transparent border-slate-200/80",
    glass: "glass-card",
    interactive: "bg-white border-slate-100/80 hover:border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300",
    flat: "bg-slate-50 border-transparent",
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
