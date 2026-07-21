import React from "react";
import { m, HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "text" | "danger" | "ghost" | "success" | "gradient" | "glass";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const base =
      "relative inline-flex items-center justify-center font-extrabold tracking-wide rounded-xl transition-all duration-250 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97] cursor-pointer overflow-hidden select-none";

    const variants: Record<string, string> = {
      /* Light: #5b8dee bg, white text — readable on all palette surfaces */
      primary:
        "[background-color:var(--color-primary)] hover:[background-color:var(--color-primary-hover)] text-white [box-shadow:var(--shadow-md)] [border:1px_solid_rgba(91,141,238,0.3)] focus-visible:ring-blue-400",

      secondary:
        "[background-color:var(--bg-card-elevated)] hover:[background-color:var(--border-color)] [color:var(--text-title)] [border:1px_solid_var(--border-color)] [box-shadow:var(--shadow-sm)] focus-visible:ring-blue-300 dark:text-slate-100 dark:border-slate-700",

      outline:
        "bg-transparent [border:1.5px_solid_var(--color-primary)] [color:var(--color-primary)] hover:[background-color:var(--color-primary-subtle)] [box-shadow:var(--shadow-sm)] focus-visible:ring-blue-400",

      text:
        "bg-transparent [color:var(--color-primary)] hover:[background-color:var(--bg-section)] focus-visible:ring-blue-400",

      danger:
        "bg-red-600 hover:bg-red-700 text-white [box-shadow:0_4px_12px_rgba(220,38,38,0.25)] border border-red-400/30 focus-visible:ring-red-500",

      success:
        "bg-emerald-600 hover:bg-emerald-700 text-white [box-shadow:0_4px_12px_rgba(22,163,74,0.25)] border border-emerald-400/30 focus-visible:ring-emerald-500",

      ghost:
        "[background-color:var(--bg-section)] hover:[background-color:var(--bg-surface)] [color:var(--text-title)] [border:1px_solid_var(--border-subtle)] focus-visible:ring-blue-300 dark:bg-slate-800/60 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700",

      gradient:
        "bg-gradient-to-r from-[#5b8dee] via-[#7ba5f5] to-[#abc4ff] text-white [box-shadow:var(--shadow-lg)] border border-white/20 focus-visible:ring-blue-400",

      glass:
        "[background:var(--glass-bg)] backdrop-blur-md [color:var(--text-title)] [border:1px_solid_var(--border-color)] hover:[background-color:var(--bg-card)] [box-shadow:var(--shadow-md)] focus-visible:ring-blue-300 dark:text-slate-100",
    };

    const sizes: Record<string, string> = {
      sm: "px-3.5 py-1.5 text-xs gap-1.5",
      md: "px-5 py-2.5 text-sm gap-2",
      lg: "px-7 py-3.5 text-base gap-2.5",
    };

    return (
      <m.button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={twMerge(
          clsx(
            base,
            variants[variant],
            sizes[size],
            isLoading && "text-transparent! hover:text-transparent!",
            className
          )
        )}
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className={clsx(
                "animate-spin h-4 w-4",
                ["primary", "danger", "success", "gradient"].includes(variant)
                  ? "text-white"
                  : "[color:var(--color-primary)]"
              )}
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}
        {!isLoading && leftIcon}
        <span className={clsx(isLoading && "opacity-0", "relative z-10")}>
          {children}
        </span>
        {!isLoading && rightIcon}
      </m.button>
    );
  }
);

Button.displayName = "Button";
