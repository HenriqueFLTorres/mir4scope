"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const onClose = () => router.back();

  return (
    <Sheet defaultOpen open onOpenChange={onClose}>
      <SheetContent className="overflow-auto">{children}</SheetContent>
    </Sheet>
  );
}
