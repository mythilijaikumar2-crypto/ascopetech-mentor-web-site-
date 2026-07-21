import React, { useState, useRef, useEffect } from "react";
import { useThemeStore, ThemeMode } from "../../store/themeStore";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { Button } from "./Button";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options: Array<{ mode: ThemeMode; label: string; icon: React.ReactNode }> = [
    { mode: "light", label: "Light", icon: <Sun className="h-4 w-4 text-amber-500" /> },
    { mode: "dark", label: "Dark", icon: <Moon className="h-4 w-4 text-indigo-400" /> },
    { mode: "system", label: "System", icon: <Monitor className="h-4 w-4 text-slate-400" /> },
  ];

  const currentOption = options.find((o) => o.mode === theme) || options[2];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
        aria-label="Toggle theme"
      >
        {currentOption.icon}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl z-50 p-1.5 animate-fade-up">
          {options.map((opt) => (
            <button
              key={opt.mode}
              onClick={() => {
                setTheme(opt.mode);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                theme === opt.mode
                  ? "bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center gap-2">
                {opt.icon}
                <span>{opt.label}</span>
              </div>
              {theme === opt.mode && <Check className="h-3.5 w-3.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
