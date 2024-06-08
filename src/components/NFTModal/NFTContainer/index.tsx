import { cn } from "@/lib/utils"

export default function NFTContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        "flex flex-col gap-8 rounded-xl border border-black/20 bg-black/10 px-6 py-4",
        className
      )}
    >
      {children}
    </section>
  )
}
