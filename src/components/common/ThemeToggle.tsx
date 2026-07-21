import React, { useState, useRef, useEffect } from "react";
import { useThemeStore, ThemeMode } from "../../store/themeStore";
import { Sun, Moon, Monitor, Check } from "lucide-react";

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
    { mode: "light",  label: "Light",  icon: <Sun  className="h-4 w-4 text-amber-500" /> },
    { mode: "dark",   label: "Dark",   icon: <Moon className="h-4 w-4 text-blue-400" /> },
    { mode: "system", label: "System", icon: <Monitor className="h-4 w-4" style={{ color: "var(--text-muted)" }} /> },
  ];

  const currentOption = options.find((o) => o.mode === theme) || options[2];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl transition-all duration-250"
        style={{ color: "var(--color-primary)", backgroundColor: "var(--bg-section)" }}
        aria-label="Toggle theme"
      >
        {currentOption.icon}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-36 rounded-2xl shadow-xl z-50 p-1.5 animate-fade-in-up"
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-xl)",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt.mode}
              onClick={() => {
                setTheme(opt.mode);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-extrabold transition-all duration-250"
              style={
                theme === opt.mode
                  ? { backgroundColor: "var(--bg-card)", color: "var(--color-primary)", border: "1px solid var(--border-color)" }
                  : { color: "var(--text-title)", backgroundColor: "transparent" }
              }
              onMouseEnter={(e) => {
                if (theme !== opt.mode) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--bg-card)";
              }}
              onMouseLeave={(e) => {
                if (theme !== opt.mode) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              <div className="flex items-center gap-2">
                {opt.icon}
                <span>{opt.label}</span>
              </div>
              {theme === opt.mode && <Check className="h-3.5 w-3.5" style={{ color: "var(--color-primary)" }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
