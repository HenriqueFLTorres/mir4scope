import { cn } from "@/lib/cn"

export default function GlassChip({
  className,
  children,
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded border border-black/10 bg-black/40 p-1 text-sm font-medium text-white drop-shadow-sm backdrop-blur-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
