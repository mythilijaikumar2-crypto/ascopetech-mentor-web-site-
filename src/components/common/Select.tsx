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
            className={clsx("text-xs font-extrabold tracking-wide [color:var(--text-title)]", disabled && "opacity-55")}
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
                "theme-input w-full px-4 py-2.5 pr-10 text-sm appearance-none transition-all duration-250 disabled:opacity-50",
                error && "!border-red-500 focus:!ring-red-400/25"
              ),
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                style={{ backgroundColor: "var(--bg-background)", color: "var(--text-title)" }}
              >
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none [color:var(--text-muted)]">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && <p className="text-xs text-red-600 dark:text-red-400 font-semibold">{error}</p>}
        {!error && helperText && <p className="text-xs [color:var(--text-muted)] font-medium">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
