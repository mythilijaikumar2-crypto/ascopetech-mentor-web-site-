import React from "react";
import { m, HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "text" | "danger" | "ghost";
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
      "relative inline-flex items-center justify-center font-extrabold tracking-normal rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97] cursor-pointer overflow-hidden group select-none";

    const variants = {
      primary:
        "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 border border-indigo-400/40 ring-1 ring-white/20 active:bg-indigo-700",
      secondary:
        "bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/20 border border-slate-700/80 active:bg-slate-950",
      outline:
        "bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200/90 hover:border-indigo-600 shadow-xs active:bg-slate-100",
      text:
        "bg-transparent hover:bg-indigo-50/80 text-indigo-600 hover:text-indigo-700 active:bg-indigo-100/80",
      danger:
        "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 hover:shadow-red-500/50 border border-red-400/40 active:bg-red-700",
      ghost:
        "bg-indigo-50/60 hover:bg-indigo-100/90 text-indigo-700 hover:text-indigo-800 border border-indigo-100 active:bg-indigo-200/70",
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
        whileHover={{ y: -2, scale: 1.025 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
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
                variant === "primary" || variant === "danger" || variant === "secondary"
                  ? "text-white"
                  : "text-indigo-600"
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
