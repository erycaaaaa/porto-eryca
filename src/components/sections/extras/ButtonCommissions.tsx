import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="py-[clamp(24px,5vw,48px)] px-[clamp(16px,4vw,24px)]">
        <div
          className="
            mx-auto max-w-5xl text-center rounded-3xl border border-[#ecd9c7] bg-[#fff8f2]/80
            p-[clamp(16px,5vw,40px)]
          "
        >
       
         <h2 className="font-serif fluid-h2 text-[#5a3b25]">Commissions are Open!</h2>
<p className="mt-2 fluid-p text-neutral-700">Ilustrasi, editorial, dan spot-art untuk brand
            atau personal.</p>


         
          <Link
            href="/commissions"
            className="
              mt-[clamp(16px,4.5vw,24px)]
              inline-flex items-center gap-[clamp(6px,2vw,8px)]
              rounded-full
              px-[clamp(14px,4vw,24px)]
              py-[clamp(8px,2.6vw,12px)]
              text-[clamp(12px,2.8vw,14px)] font-medium text-white
              bg-gradient-to-r from-[#a66b3f] via-[#8f623e] to-[#6e482c]
              shadow-md hover:shadow-lg hover:from-[#b97a4d] hover:to-[#5a3b25]
              transition-all duration-200
            "
            aria-label="See commission details"
          >
            See Details
          </Link>
        </div>
      </section>
    </main>
  );
}
