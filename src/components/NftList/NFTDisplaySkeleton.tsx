export default function NFTDisplaySkeleton() {
  return (
    <section className="mb-24 flex flex-col gap-8 md:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from(Array(20).keys()).map((loadingIndex) => (
        <div
          key={`loading-${loadingIndex}`}
          className="relative flex h-[25rem] w-72 animate-pulse flex-col gap-4 rounded-lg border-4 border-[#4c3b75] bg-[#4c3b75] p-1"
        >
          <div className="grid h-max w-full grid-cols-3 items-center justify-between gap-1">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className="flex h-8 w-full items-center gap-2 rounded bg-[#564284] p-1"
              />
            ))}
          </div>

          <div className="mt-auto flex w-full flex-col gap-2">
            <div className="flex items-end justify-between">
              <div className="h-6 w-36 rounded-full bg-[#564284]" />
              <div className="h-4 w-14 rounded-full bg-[#564284]" />
            </div>
            <div className="flex justify-between">
              <div className="h-[1.875rem] w-[5.5rem] rounded bg-[#564284]" />
              <div className="h-[1.875rem] w-[5.5rem] rounded bg-[#564284]" />
            </div>
            <div className="h-[2.125rem] w-full rounded bg-[#564284]" />
          </div>
        </div>
      ))}
    </section>
  );
}
