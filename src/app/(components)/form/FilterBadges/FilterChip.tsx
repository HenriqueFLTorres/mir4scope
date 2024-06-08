import { cn } from "@/lib/cn"
import { Root } from "@radix-ui/react-label"
import { X } from "lucide-react"
import type { ComponentPropsWithoutRef } from "react"

function FilterChip({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Root>) {
  return (
    <Root
      className={cn(
        "relative flex h-10 cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-black/20 bg-black/10 p-1 px-3 pr-2 text-sm font-medium text-white drop-shadow-md transition-colors focus-within:border-error-400/30 focus-within:bg-error-400/10 focus-within:ring-2 focus-within:ring-error-400 hover:border-error-400/30 hover:bg-error-400/10",
        className
      )}
      {...props}
    >
      {children}
      <button className="rounded p-0.5 outline-none" type="button">
        <X className="h-4 w-4" />
      </button>
    </Root>
  )
}
export { FilterChip }
