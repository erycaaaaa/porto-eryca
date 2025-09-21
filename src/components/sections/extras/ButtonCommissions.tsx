import Link from "next/link";

export default function HomePage() {
  return (
    <main> {/* ← Hapus min-h-screen */}
      <section className="py-12 px-6">
        <div className="mx-auto max-w-5xl text-center rounded-3xl border border-[#ecd9c7] bg-[#fff8f2]/80 p-10">
          <h2 className="font-serif text-3xl text-[#5a3b25]">Commissions are Open!</h2>
          <p className="mt-2 text-neutral-700">
            Ilustrasi bergaya buku dongeng, editorial, dan spot-art untuk brand atau personal.
          </p>

          <Link
            href="/commissions"
            className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white
                       bg-gradient-to-r from-[#a66b3f] via-[#8f623e] to-[#6e482c]
                       shadow-md hover:shadow-lg hover:from-[#b97a4d] hover:to-[#5a3b25]
                       transition-all duration-200"
          >
            See Details
          </Link>
        </div>
      </section>
    </main>
  );
}
