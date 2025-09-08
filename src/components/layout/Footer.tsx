/* eslint-disable @next/next/no-img-element */

import React, { JSX } from "react";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";

type LinkItem = { label: string; href: string };
type LinkGroup = { heading: string; items: LinkItem[] };
type SocialKey = "github" | "instagram" | "linkedin" | "email";

export type FooterProps = {
  brandName?: string;
  brandLogoSrc?: string;
  groups?: LinkGroup[];
  socials?: Partial<Record<SocialKey, string>>;
  children?: React.ReactNode;
  showBackToTop?: boolean;
  decorativeGifSrc?: string;
  decorativeAlt?: string;
};

const icons: Record<SocialKey, JSX.Element> = {
  github: <Github className="h-5 w-5 text-[#3b2f22]" aria-hidden="true" />,
  instagram: <Instagram className="h-5 w-5 text-[#3b2f22]" aria-hidden="true" />,
  linkedin: <Linkedin className="h-5 w-5 text-[#3b2f22]" aria-hidden="true" />,
  email: <Mail className="h-5 w-5 text-[#3b2f22]" aria-hidden="true" />,
};

export default function Footer({
  brandName = "Eryca",
  brandLogoSrc,
  groups = [
    { heading: "Happy", items: [{ label: "Blog", href: "#" }] },
    { heading: "Products", items: [{ label: "Partner Resources", href: "#work" }] },
    {
      heading: "Contact",
      items: [
        { label: "FAQs", href: "#" },
        { label: "Contact", href: "#contact" },
        { label: "About Us", href: "#about" },
      ],
    },
  ],
  socials = {},
  children,
  showBackToTop = true,
  decorativeGifSrc,
  decorativeAlt = "",
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="
        relative w-full border-t border-[#e8e0c2] bg-[#3b2f22] text-[#e8e0c2]
        shadow-[0_-4px_12px_rgba(0,0,0,0.4)]
        dark:bg-[#95927573] dark:text-white dark:border-[#3b3526]
      "
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        {/* Atas: Brand + Link Groups */}
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-4">
          <div className="self-start space-y-3">
            <div className="flex items-center gap-3">
              {brandLogoSrc && (
                <img
                  src={brandLogoSrc}
                  alt={`${brandName} logo`}
                  className="h-7 w-7 object-contain"
                  loading="lazy"
                />
              )}
              <span className="text-base font-semibold leading-none">{brandName}</span>
            </div>
            <p className="text-sm text-[#e8e0c2]">
              Nature-inspired craft & everyday florals.
            </p>
          </div>

          {groups.map((g) => (
            <nav
              key={g.heading}
              aria-labelledby={`footer-${g.heading.replace(/\s+/g, "-")}`}
              className="self-start"
            >
              <h3
                id={`footer-${g.heading.replace(/\s+/g, "-")}`}
                className="mb-2 text-sm font-semibold leading-none tracking-wide text-[#b2a98a]"
              >
                {g.heading}
              </h3>
              <ul className="space-y-1.5 text-sm">
                {g.items.map((it) => (
                  <li key={it.label}>
                    <a
                      href={it.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        rounded-[4px] px-0.5 text-[#e8e0c2] transition-colors hover:text-[#e8e0c2]
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e0c2]
                        focus-visible:ring-offset-2 focus-visible:ring-offset-[#3b2f22]
                      "
                    >
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bawah: Sosial + Hak Cipta */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            {Object.entries(socials).map(([k, url]) => {
              if (!url) return null;
              const key = k as SocialKey;
              const href = key === "email" ? `mailto:${url}` : url;

              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={key}
                  title={key}
                  className="
                    rounded-md bg-[#e8e0c2] p-2 transition-colors hover:bg-[#d4cbb0]
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e0c2] group
                  "
                >
                  <span className="block transition-colors group-hover:text-[#3b2f22]">
                    {icons[key]}
                  </span>
                </a>
              );
            })}
          </div>
          <div className="text-center text-sm text-[#b2a98a]">
            {children ?? <>©{year} {brandName}. All rights reserved.</>}
          </div>
        </div>
      </div>

      {/* Dekorasi opsional */}
      {decorativeGifSrc && (
        <img
          src={decorativeGifSrc}
          alt={decorativeAlt}
          className="
            pointer-events-none select-none
            absolute bottom-[15px] left-[10px]
            z-0 w-auto max-h-[45px] opacity-90
          "
          loading="lazy"
        />
      )}

      {/* Tombol Back to Top */}
      {showBackToTop && (
        <a
          href="#top"
          className="
            absolute bottom-40 right-10 inline-flex items-center justify-center rounded-full
            border border-[#e8e0c2] bg-[#e8e0c2] p-2
            shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_8px_22px_rgba(0,0,0,0.25)]
            backdrop-blur-sm transition hover:bg-[#e8e0c2] hover:text-[#e8e0c2]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e0c2]
            focus-visible:ring-offset-2 focus-visible:ring-offset-[#3b2f22] group
          "
          aria-label="Back to top"
        >
          <img
            src="/public/ikan.gif"
            alt="Back to top icon"
            className="h-[55px] w-[52px] select-none rounded-full ring-1 ring-[#b2a98a] shadow-[0_8px_22px_rgba(0,0,0,0.4)]"
            loading="lazy"
          />
          
          <span
            className="
              absolute -top-8 whitespace-nowrap rounded-md bg-black/80 px-2 py-1
              text-[11px] text-[#b2a98a] opacity-0 transition
              group-hover:opacity-100 group-focus-visible:opacity-100
            "
          >
            Back to top
          </span>
        </a>
      )}
    </footer>
  );
}
