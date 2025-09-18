import { TarotButtonLink } from "@/components/case/TarrotButton";

export default function Loading() {
  return (
    <div className="fixed inset-0 grid place-items-center bg-[#F8F6EE]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-black/70 border-t-transparent" />
         <div className="mt-6">
        <TarotButtonLink />
      </div>
      </div>
    </div>
  );
}
