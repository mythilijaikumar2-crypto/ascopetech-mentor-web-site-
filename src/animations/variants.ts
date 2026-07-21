import { Variants } from "framer-motion";

// Standard transition timings
export const TRANSITION_FAST = { duration: 0.2, ease: [0.25, 1, 0.5, 1] } as const;
export const TRANSITION_MEDIUM = { duration: 0.4, ease: [0.25, 1, 0.5, 1] } as const;
export const TRANSITION_SLOW = { duration: 0.6, ease: [0.16, 1, 0.3, 1] } as const;

// Centralized variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: TRANSITION_MEDIUM,
  },
  exit: {
    opacity: 0,
    transition: TRANSITION_FAST,
  }
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION_SLOW,
  },
  exit: {
    opacity: 0,
    y: 12,
    transition: TRANSITION_FAST,
  }
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION_SLOW,
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: TRANSITION_FAST,
  }
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: TRANSITION_SLOW,
  },
  exit: {
    opacity: 0,
    x: 12,
    transition: TRANSITION_FAST,
  }
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: TRANSITION_SLOW,
  },
  exit: {
    opacity: 0,
    x: -12,
    transition: TRANSITION_FAST,
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: TRANSITION_SLOW,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: TRANSITION_FAST,
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION_MEDIUM,
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: TRANSITION_FAST,
  }
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: TRANSITION_MEDIUM,
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: TRANSITION_FAST,
  }
};

export const modalAnimation: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] as const }, // Slight bounce effect
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 8,
    transition: TRANSITION_FAST,
  }
};

export const drawerAnimation = (side: "left" | "right"): Variants => ({
  hidden: { x: side === "right" ? "100%" : "-100%", opacity: 0.5 },
  visible: {
    x: 0,
    opacity: 1,
    transition: TRANSITION_MEDIUM,
  },
  exit: {
    x: side === "right" ? "100%" : "-100%",
    opacity: 0.5,
    transition: TRANSITION_FAST,
  }
});

export const cardHover = {
  initial: { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)" },
  hover: {
    y: -4,
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.02)",
    transition: { duration: 0.25, ease: "easeOut" },
  }
};

export const buttonTap = {
  tap: { scale: 0.97, transition: { duration: 0.05 } }
};

export const textReveal: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: TRANSITION_SLOW,
  }
};
