import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static";

type Brand = { name: string; href: string; src: string };
type BrandsLogoProps = { brands?: Brand[]; className?: string };

const DEFAULT_BRANDS: Brand[] = [
  { name: "TeslaPaints", href: "https://www.teslapaints.com/", src: "/porto-eryca/tes.jpg" },
  { name: "Giorgione",   href: "https://giorgione.in/",         src: "/porto-eryca/gio.jpg" },
  { name: "Sakura Koi",  href: "https://www.craypas.com/global/",src: "/porto-eryca/sa.jpg" },
  { name: "Baohong",     href: "https://baohongpaper.com/",      src: "/porto-eryca/bao.jpg" },
  { name: "Prismacolor", href: "https://www.prismacolor.com/",   src: "/porto-eryca/pri.jpg" },
];

export default function BrandsLogo({ brands = DEFAULT_BRANDS, className }: BrandsLogoProps) {
  return (
    <section aria-label="Partner brands" className={`w-full ${className ?? ""}`}>

      <ul className="mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-items-center gap-4 sm:gap-5 md:gap-6 px-4 py-12 lg:px-8">
        {brands.map((b) => (
          <li key={b.name}>
            <Link
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={b.name}
              title={b.name}
              className="
                group block rounded-xl transition-all duration-200
                ring-1 ring-transparent
                hover:bg-white hover:shadow-md hover:ring-white/80
                hover:ring-offset-4 md:hover:ring-offset-8 hover:ring-offset-transparent
                focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70
              "
            >
              {/* KOTAK PERSEGI: ukuran kecil & konsisten, mengikuti logo */}
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32">
                <Image
                  src={b.src}
                  alt={b.name}
                  fill
                  sizes="(min-width:1280px) 8rem, (min-width:768px) 7rem, (min-width:640px) 6rem, 5rem"
                  className="object-contain p-2 sm:p-3 grayscale opacity-70 transition-all duration-200 group-hover:grayscale-0 group-hover:opacity-100"
                  priority={false}
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
