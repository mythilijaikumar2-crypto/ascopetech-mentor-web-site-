import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "rectangular" | "circular";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = "rectangular",
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "bg-slate-200 animate-pulse",
          variant === "text" && "h-4 w-full rounded-md",
          variant === "rectangular" && "rounded-2xl",
          variant === "circular" && "rounded-full aspect-square",
          className
        )
      )}
      {...props}
    />
  );
};
