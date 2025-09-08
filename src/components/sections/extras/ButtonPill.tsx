function ButtonPill({
  href,
  children,
  className = "",
  ariaLabel,
  target, // ⬅️ baru
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  target?: "_blank" | "_self" | "_parent" | "_top"; // ⬅️ baru
}) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 ${className}`}
    >
      {children}
    </a>
  );
}
