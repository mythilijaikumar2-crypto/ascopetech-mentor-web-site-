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
              "text-xs font-bold text-slate-800 dark:text-slate-200 tracking-wide",
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
                "w-full px-4 py-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl text-sm transition-all duration-250 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-950 placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-xs",
                error && "border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-500/20"
              ),
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-red-500 dark:text-red-400 font-semibold">{error}</p>
        )}
        {!error && helperText && (
          <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
