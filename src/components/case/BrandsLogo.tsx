import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static"; 

type Brand = {
  name: string;
  href: string;
  src: string;
};

type BrandsLogoProps = {
  brands?: Brand[];
  className?: string;
};

const DEFAULT_BRANDS: Brand[] = [
  { name: "TeslaPaints", href: "https://www.teslapaints.com/", src: "/porto-eryca/tes.jpg" },
  { name: "Giorgione", href: "https://giorgione.in/", src: "/porto-eryca/gio.jpg" },
  { name: "Sakura Koi", href: "https://www.craypas.com/global/", src: "/porto-eryca/sak.jpg" },
  { name: "Baohong", href: "https://baohongpaper.com/", src: "/porto-eryca/bao.jpg" },
  { name: "Prismacolor", href: "https://www.prismacolor.com/", src: "/porto-eryca/pri.jpg" },
];

export default function BrandsLogo({ brands = DEFAULT_BRANDS, className }: BrandsLogoProps) {
  return (
    <section aria-label="Partner brands" className={`w-full ${className ?? ""}`}>
      <ul className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-6 md:gap-6 md:py-16 lg:px-8">
        {brands.map((brand) => (
          <li key={brand.name} className="flex-shrink-0">
            <Link
              href={brand.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={brand.name}
              className="group block rounded-2xl p-2 transition-all duration-200 ease-out
                         hover:bg-white/35 hover:shadow-xl hover:-translate-y-0.5
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70"
            >
              <div className="pointer-events-none flex h-12 w-28 items-center justify-center md:h-14 md:w-32">
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={1080}
                  height={1080}
                  className="h-8 w-auto md:h-10 object-contain grayscale opacity-70 transition-all duration-200
                             group-hover:grayscale-0 group-hover:opacity-100"
                  priority={false}
                />
              </div>
              <span className="sr-only">Go to {brand.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
