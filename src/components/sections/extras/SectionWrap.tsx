export default function SectionWrap({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={className}>
      <div className="container mx-auto max-w-7xl px-5">{children}</div>
    </section>
  );
}
