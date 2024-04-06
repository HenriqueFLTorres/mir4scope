"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const onClose = () => router.back();
  router.push("/");

  return (
    <Dialog defaultOpen open onOpenChange={onClose}>
      <DialogContent>efwefwefwef</DialogContent>
    </Dialog>
  );
}
