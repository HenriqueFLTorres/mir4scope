"use client"

import { useRouter } from "next/navigation"
import { Sheet, SheetContent } from "@/components/ui"

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const onClose = () => router.back()

  return (
    <Sheet defaultOpen open onOpenChange={onClose}>
      <SheetContent className="overflow-auto">{children}</SheetContent>
    </Sheet>
  )
}
