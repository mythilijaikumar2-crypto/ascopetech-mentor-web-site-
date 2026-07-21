import React, { useEffect } from "react";
import { AnimatePresence, m } from "framer-motion";
import { fadeIn, drawerAnimation } from "../../animations/variants";
import { X } from "lucide-react";
import { Button } from "./Button";
import { clsx } from "clsx";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: "left" | "right";
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  side = "right",
  size = "md",
  showCloseButton = true,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const sizes = {
    sm: "max-w-xs",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay */}
          <m.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Drawer Wrapper */}
          <div className={clsx("fixed inset-y-0 flex z-10", side === "right" ? "right-0" : "left-0")}>
            <m.div
              variants={drawerAnimation(side)}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              className={clsx(
                "w-screen bg-white shadow-2xl border-l border-slate-100 flex flex-col h-full overflow-hidden",
                sizes[size]
              )}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100 bg-slate-50/50">
                  {title ? (
                    <h3 className="text-base font-semibold text-slate-800 tracking-tight">
                      {title}
                    </h3>
                  ) : (
                    <div />
                  )}
                  {showCloseButton && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                      onClick={onClose}
                      aria-label="Close drawer"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              )}

              {/* Scrollable Content */}
              <div className="flex-1 px-6 py-5 overflow-y-auto text-sm text-slate-600">
                {children}
              </div>
            </m.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
