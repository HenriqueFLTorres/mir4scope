import { equip_order, equip_slot_position } from "./NFTEquipmentDisplay";

export default function NFTModalIntroductionSkeleton() {
  return (
    <section className="mb-16 flex h-[34rem] w-full animate-pulse justify-center gap-16">
      <div className="relative mx-10 my-6 h-[32rem] w-[32rem]">
        <ul className="grid w-max grid-cols-5 items-center gap-3 p-1">
          {equip_order.map((_, index) => (
            <li
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              className="absolute z-[100] h-20 w-20 rounded-full bg-black/50"
              style={equip_slot_position[index]}
            />
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <span className="h-9 w-32 rounded-full bg-black/50" />

        <div className="flex flex-wrap gap-2">
          <div className="h-[2.625rem] w-[5.6rem] rounded-md bg-black/50" />
          <div className="h-[2.625rem] w-[6.5rem] rounded-md bg-black/50" />
          <div className="h-[2.625rem] w-32 rounded-md bg-black/50" />
          <div className="h-[2.625rem] w-32 rounded-md bg-black/50" />
        </div>

        <div className="h-32 w-full rounded-md bg-black/50" />

        <footer className="mt-auto flex flex-col gap-4">
          <div className="h-14 w-full rounded-lg bg-black/50" />

          <div className="h-14 w-full rounded-lg bg-black/50" />
        </footer>
      </div>
    </section>
  );
}
