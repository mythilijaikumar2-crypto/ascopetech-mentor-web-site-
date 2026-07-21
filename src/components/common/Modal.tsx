import React, { useEffect, useRef } from "react";
import { AnimatePresence, m } from "framer-motion";
import { fadeIn, modalAnimation } from "../../animations/variants";
import { X } from "lucide-react";
import { Button } from "./Button";
import { clsx } from "clsx";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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

  const sizes: Record<string, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <m.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 [background:rgba(13,27,62,0.55)] backdrop-blur-sm"
          />

          {/* Panel */}
          <m.div
            ref={modalRef}
            variants={modalAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            className={clsx(
              "relative w-full flex flex-col z-10 max-h-[90vh] overflow-hidden rounded-3xl",
              "[background-color:var(--bg-surface)] [border:1px_solid_var(--border-color)] [box-shadow:var(--shadow-xl)]",
              sizes[size]
            )}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div
                className="flex items-center justify-between px-6 py-4 [border-bottom:1px_solid_var(--divider-color)] [background-color:var(--bg-card)]"
              >
                {title ? (
                  <h3 className="text-base font-extrabold tracking-tight text-balance [color:var(--text-heading)]">
                    {title}
                  </h3>
                ) : (
                  <div />
                )}
                {showCloseButton && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1.5 rounded-lg [color:var(--text-muted)] hover:[background-color:var(--bg-section)]"
                    onClick={onClose}
                    aria-label="Close modal"
                  >
                    <X className="h-4.5 w-4.5" />
                  </Button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="flex-1 px-6 py-5 overflow-y-auto text-sm [color:var(--text-paragraph)]">
              {children}
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
};
