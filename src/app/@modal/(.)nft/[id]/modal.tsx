"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { type ElementRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const onClose = () => router.back();

  return (
    <Dialog defaultOpen open onOpenChange={onClose}>
      <DialogContent>efwefwefwef</DialogContent>
    </Dialog>
  );
}
