// src/components/sections/extras/ButtonPill.tsx
import React from "react";

export default function ButtonPill({
  href,
  children,
  className = "",
  ariaLabel,
  target, 
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}): React.JSX.Element {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-full 
        bg-black px-4 py-2 text-sm font-medium text-white 
        transition-opacity hover:opacity-90 
        focus:outline-none focus-visible:ring-2 
        focus-visible:ring-black/30 ${className}`}
    >
      {children}
    </a>
  );
}
