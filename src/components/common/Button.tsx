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
    const baseStyles =
      "relative inline-flex items-center justify-center font-extrabold tracking-normal rounded-xl transition-all duration-250 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97] cursor-pointer overflow-hidden group select-none";

    const variants = {
      primary:
        "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white shadow-md shadow-blue-500/25 border border-blue-400/30 active:bg-blue-800",
      secondary:
        "bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-400 dark:hover:bg-cyan-300 text-slate-950 shadow-md shadow-cyan-500/20 border border-cyan-300/40 active:bg-cyan-700 font-extrabold",
      outline:
        "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-xs",
      text:
        "bg-transparent hover:bg-blue-50/80 dark:hover:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300",
      danger:
        "bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400 text-white shadow-md shadow-red-500/25 border border-red-400/30 active:bg-red-800",
      success:
        "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white shadow-md shadow-emerald-500/25 border border-emerald-400/30 active:bg-emerald-800",
      ghost:
        "bg-slate-100/80 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/50",
      gradient:
        "bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/30 border border-white/20",
      glass:
        "bg-white/70 dark:bg-slate-900/70 backdrop-blur-md text-slate-900 dark:text-white border border-white/40 dark:border-slate-800 hover:bg-white/90 dark:hover:bg-slate-900/90 shadow-md",
    };

    const sizes = {
      sm: "px-3.5 py-1.5 text-xs gap-1.5",
      md: "px-5 py-2.5 text-sm gap-2",
      lg: "px-6.5 py-3.5 text-base gap-2.5",
    };

    return (
      <m.button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={twMerge(
          clsx(
            baseStyles,
            variants[variant],
            sizes[size],
            isLoading && "relative text-transparent! hover:text-transparent!",
            className
          )
        )}
        {...props}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className={clsx(
                "animate-spin h-5 w-5",
                variant === "primary" || variant === "danger" || variant === "success" || variant === "gradient"
                  ? "text-white"
                  : "text-blue-500"
              )}
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}

        {!isLoading && leftIcon}
        <span className={clsx(isLoading && "opacity-0", "relative z-10 font-extrabold tracking-wide")}>
          {children}
        </span>
        {!isLoading && rightIcon}
      </m.button>
    );
  }
);

Button.displayName = "Button";
