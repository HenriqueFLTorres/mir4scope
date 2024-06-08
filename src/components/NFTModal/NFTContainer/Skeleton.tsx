export default function NFTContainerSkeleton() {
  return (
    <div className="flex animate-pulse flex-col rounded-xl border border-black/50 bg-black/50 px-6 py-4">
      <header className="mb-8 flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-black/50" />
          <div className="h-6 w-28 rounded-full bg-black/50" />
        </div>
      </header>

      <div className="flex flex-row gap-4">
        <div className="h-20 w-20 rounded-full bg-black/50" />
        <div className="h-20 w-20 rounded-full bg-black/50" />
        <div className="h-20 w-20 rounded-full bg-black/50" />
        <div className="h-20 w-20 rounded-full bg-black/50" />
        <div className="h-20 w-20 rounded-full bg-black/50" />
      </div>
    </div>
  )
}
