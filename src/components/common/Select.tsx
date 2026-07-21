import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, disabled, id, options, ...props }, ref) => {
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
          <select
            id={id}
            ref={ref}
            disabled={disabled}
            className={twMerge(
              clsx(
                "w-full px-4 py-2.5 bg-white text-slate-900 border border-slate-200 rounded-xl text-sm transition-all focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 disabled:opacity-50 disabled:bg-slate-50 appearance-none",
                error && "border-red-500 focus:border-red-500 focus:ring-red-500"
              ),
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* Custom Chevron icon */}
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
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

Select.displayName = "Select";
