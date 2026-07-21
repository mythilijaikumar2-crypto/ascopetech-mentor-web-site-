import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, helperText, disabled, id, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className={clsx(
              "text-xs font-semibold text-slate-700 tracking-wide",
              disabled && "opacity-60"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={id}
            ref={ref}
            type={type}
            disabled={disabled}
            className={twMerge(
              clsx(
                "w-full px-4 py-2.5 bg-white text-slate-900 border border-slate-200 rounded-xl text-sm transition-all focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 disabled:opacity-50 disabled:bg-slate-50",
                error && "border-red-500 focus:border-red-500 focus:ring-red-500"
              ),
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-red-500 font-medium animate-fade-in">{error}</p>
        )}
        {!error && helperText && (
          <p className="text-xs text-slate-500 font-normal">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
