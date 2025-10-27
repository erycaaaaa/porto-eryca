import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static";

type Brand = { name: string; href: string; src: string };
type BrandsLogoProps = { brands?: Brand[]; className?: string };

const DEFAULT_BRANDS: Brand[] = [
  {
    name: "TeslaPaints",
    href: "https://www.teslapaints.com/",
    src: "/porto-eryca/tes.jpg",
  },
  {
    name: "Giorgione",
    href: "https://giorgione.in/",
    src: "/porto-eryca/gio.jpg",
  },
  {
    name: "Sakura Koi",
    href: "https://www.craypas.com/global/",
    src: "/porto-eryca/sa.jpg",
  },
  {
    name: "Baohong",
    href: "https://baohongpaper.com/",
    src: "/porto-eryca/bao.jpg",
  },
  {
    name: "Prismacolor",
    href: "https://www.prismacolor.com/",
    src: "/porto-eryca/pri.jpg",
  },
];

export default function BrandsLogo({
  brands = DEFAULT_BRANDS,
  className,
}: BrandsLogoProps) {
  return (
    <section
      aria-label="Partner brands"
      className={`w-full ${className ?? ""}`}
    >
      <ul
        className="
    mx-auto max-w-7xl px-4 lg:px-8 py-8
    grid grid-flow-col auto-cols-[minmax(0,1fr)] place-items-center
    gap-5 sm:gap-5 md:gap-4
  "
      >
        {brands.map((b) => (
          <li key={b.name} className="min-w-0">
            <Link
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={b.name}
              title={b.name}
              className="
          group block rounded-lg transition-all duration-200
          ring-1 ring-transparent hover:bg-white hover:shadow-md hover:ring-white/80
          focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70
        "
            >
              <div className="relative aspect-square w-[min(14vw,3.5rem)] sm:w-[min(12vw,4rem)] md:w-[min(10vw,4.5rem)]">
                <Image
                  src={b.src}
                  alt={b.name}
                  fill
                  sizes="(min-width:1024px) 4.5rem, (min-width:640px) 4rem, 14vw"
                  className="object-contain p-2 grayscale opacity-70 transition group-hover:grayscale-0 group-hover:opacity-100"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="sr-only">Go to {b.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
