/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";

type LinkItem = { label: string; href: string };
type LinkGroup = { heading: string; items: LinkItem[] };
type SocialKey = "github" | "instagram" | "linkedin" | "email";

export type FooterProps = {
  brandName?: string;
  brandLogoSrc?: string;
  brandHref?: string;
  groups?: LinkGroup[];
  socials?: Partial<Record<SocialKey, string>>;
  children?: React.ReactNode;
  showBackToTop?: boolean;
  decorativeGifSrc?: string;
  decorativeAlt?: string;
};

const iconSizes = "h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7";
const icons: Record<SocialKey, React.ReactNode> = {
  github: <Github className={iconSizes} aria-hidden="true" />,
  instagram: <Instagram className={iconSizes} aria-hidden="true" />,
  linkedin: <Linkedin className={iconSizes} aria-hidden="true" />,
  email: <Mail className={iconSizes} aria-hidden="true" />,
};

export default function Footer({
  brandName = "Eryca",
  brandLogoSrc,
  brandHref = "/",
  // groups = [
  //   { heading: "Happy", items: [{ label: "Blog", href: "#" }] },
  // ],
  socials = {},
  children,
  showBackToTop = true,
  decorativeGifSrc,
  decorativeAlt = "",
}: FooterProps) {
  const year = new Date().getFullYear();

  const normalizeHref = (key: SocialKey, url: string) => {
    if (key === "email") {
      if (/^mailto:/i.test(url) || /^https?:\/\//i.test(url)) return url;
      return `mailto:${url}`;
    }
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url.replace(/^\/\//, "")}`;
  };

  return (
    <footer
      id="footer"
      className="
        relative w-full  bg-[#1f1810] text-white
        shadow-[0_-1px_80px_rgba(0,0,0,0.4)]
        dark:bg-[#95927573] dark:text-white dark:shadow-[0_-1px_80px_rgba(1,1,1,0.6)]
      "
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        {/* Atas: Brand + Link Groups */}
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-4">
          <div className="self-start space-y-3">
            <a
              href={brandHref}
              className="flex items-center gap-3 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f1810]"
              aria-label={`${brandName} home`}
            >
              {brandLogoSrc ? (
                <img
                  src={brandLogoSrc}
                  alt={`${brandName} logo`}
                  width={72}
                  height={72}
                  loading="lazy"
                  decoding="async"
                  className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 object-contain"
                />
              ) : (
                <span className="inline-flex h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 items-center justify-center rounded bg-white text-[#1f1810] font-semibold">
                  {brandName.slice(0, 1)}
                </span>
              )}
              <span className="text-base md:text-lg font-semibold leading-none">
                {brandName}
              </span>
            </a>
           
          </div>

          {/* {groups.map((g) => (
            <nav
              key={g.heading}
              aria-labelledby={`footer-${g.heading.replace(/\s+/g, "-")}`}
              className="self-start"
            >
              <h3
                id={`footer-${g.heading.replace(/\s+/g, "-")}`}
                className="mb-2 text-sm font-semibold leading-none tracking-wide text-white"
              >
                {g.heading}
              </h3>
              <ul className="space-y-1.5 text-sm">
                {g.items.map((it) => {
                  const external = /^https?:\/\//.test(it.href);
                  return (
                    <li key={it.label}>
                      <a
                        href={it.href}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="
                          rounded-[4px] px-0.5 text-white/90 transition-colors hover:text-white
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                          focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f1810]
                        "
                      >
                        {it.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))} */}
        </div>

        {/* Bawah: Sosial + Hak Cipta */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
            {Object.entries(socials).map(([k, url]) => {
              if (!url) return null;
              const key = k as SocialKey;
              const href = normalizeHref(key, url);
              const label =
                key === "github"
                  ? "GitHub"
                  : key === "instagram"
                  ? "Instagram"
                  : key === "linkedin"
                  ? "LinkedIn"
                  : "Email";

              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="
                    flex h-10 w-10 md:h-11 md:w-11 items-center justify-center
                    rounded-md bg-white/95 text-[#1f1810]
                    dark:bg-[#1f1810]/40 dark:text-white
                    shadow-sm ring-1 ring-black/5
                    transition hover:bg-black/70 hover:shadow-md
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-offset-2 focus-visible:ring-[#8f623e]/40
                    dark:focus-visible:ring-offset-[#1f1810]
                  "
                >
                  {icons[key]}
                  <span className="sr-only">{label}</span>
                </a>
              );
            })}
          </div>

          <div className="text-center text-sm text-white/80">
            {children ?? <>©{year} {brandName}. All rights reserved.</>}
          </div>
        </div>
      </div>

      {decorativeGifSrc && (
        <img
          src={decorativeGifSrc}
          alt={decorativeAlt}
          className="pointer-events-none select-none absolute bottom-[15px] left-[10px] z-0 w-auto max-h-[45px] opacity-90"
          loading="lazy"
        />
      )}

      {showBackToTop && (
        <a
          href="#top"
          className="
            absolute bottom-40 right-10 inline-flex items-center justify-center rounded-full
            border border-white bg-white p-2
            shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_8px_22px_rgba(0,0,0,0.25)]
            backdrop-blur-sm transition hover:bg-white/90
            focus:outline-none focus-visible:ring-2 focus-visible:ring-white
            focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f1810] group
          "
          aria-label="Back to top"
        >
          <img
            src="/porto-eryca/ikan.gif"
            alt="Back to top icon"
            className="h-[55px] w-[52px] select-none rounded-full ring-1 ring-white shadow-[0_8px_22px_rgba(0,0,0,0.4)]"
            loading="lazy"
          />
          <span
            className="
              absolute -top-8 whitespace-nowrap rounded-md bg-black/80 px-2 py-1
              text-[11px] text-white opacity-0 transition
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
