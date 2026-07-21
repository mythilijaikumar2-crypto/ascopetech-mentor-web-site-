import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, helperText, disabled, id, leftIcon, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className={clsx(
              "text-xs font-extrabold tracking-wide",
              "[color:var(--text-title)]",
              disabled && "opacity-55"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none [color:var(--text-muted)]">
              {leftIcon}
            </div>
          )}
          <input
            id={id}
            ref={ref}
            type={type}
            disabled={disabled}
            className={twMerge(
              clsx(
                "theme-input w-full py-2.5 text-sm transition-all duration-250 disabled:opacity-50",
                leftIcon ? "pl-10 pr-4" : "px-4",
                error && "!border-red-500 focus:!ring-red-400/25"
              ),
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-red-600 dark:text-red-400 font-semibold animate-fade-in-up">{error}</p>
        )}
        {!error && helperText && (
          <p className="text-xs [color:var(--text-muted)] font-medium">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
