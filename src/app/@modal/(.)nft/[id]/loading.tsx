import NFTModalIntroductionSkeleton from "@/components/NFTModal/Introduction.skeleton";
import NFTContainerSkeleton from "@/components/NFTModal/NFTContainer/Skeleton";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function Loading() {
  return (
    <Sheet defaultOpen open>
      <SheetContent
        className={cn(
          "fixed z-50 gap-4 border-l border-black/50 bg-black/30 p-6 text-neutral-100 shadow-lg backdrop-blur-3xl transition duration-500 ease-in-out",
          "inset-y-0 right-0 h-full w-full max-w-[70rem]",
          "animate-in slide-in-from-right",
        )}
      >
        <NFTModalIntroductionSkeleton />

        <section className="grid grid-cols-2 gap-4">
          <NFTContainerSkeleton />
          <NFTContainerSkeleton />
          <NFTContainerSkeleton />
          <NFTContainerSkeleton />
        </section>
      </SheetContent>
    </Sheet>
  );
}