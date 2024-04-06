export default function NFTContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-8 rounded-xl border border-black/20 bg-black/10 px-6 py-4">
      {children}
    </section>
  );
}
