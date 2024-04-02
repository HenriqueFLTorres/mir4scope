import { classIndexToName, gradeToRarity, handleTierValue } from "@/lib/utils";
import Image from "next/image";
import type { NftEquipItem } from "../../../prisma-types";

const slot_position = [
  {
    left: 125.22,
    top: -23.36,
  },
  {
    left: 24.38,
    top: 46.24,
  },
  {
    left: -32.56,
    top: 154.74,
  },
  {
    left: -32.56,
    top: 277.26,
  },
  {
    left: 24.38,
    top: 385.76,
  },
  {
    left: 125.22,
    top: 455.36,
  },
  {
    left: 246.86,
    top: 470.13,
  },
  {
    left: 361.42,
    top: 426.68,
  },
  {
    left: 442.68,
    top: 334.97,
  },
  {
    left: 472,
    top: 216,
  },
];

const equip_order = [1, 9, 5, 6, 7, 8, 2, 3, 4, 10];

export default function NFTEquipmentDisplay({
  equip_items,
  class: classIndex,
}: {
  equip_items: { [key in string]: NftEquipItem };
  class: number;
}) {
  return (
    <div className="relative mx-10 my-6 h-[32rem] w-[32rem]">
      <Image
        src="/nft/bg-character-equip.webp"
        alt=""
        width={512}
        height={512}
        className="absolute object-contain"
      />

      <Image
        width={452}
        height={452}
        src={`/class-preview/${classIndexToName(classIndex)}.webp`}
        alt=""
        className="pointer-events-none absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] object-contain"
      />

      <ul className="grid w-max grid-cols-5 items-center gap-3 p-1">
        {equip_order.map((key, index) => {
          const { enhance, grade, item_path, item_name, tier } =
            equip_items[key];

          return (
            <li
              key={item_name}
              className="absolute flex h-20 w-20 items-center gap-2 p-1 text-sm font-bold text-white [&>span]:drop-shadow-[0_0_2px_rgb(0,0,0)]"
              style={slot_position[index]}
            >
              <div className="flex h-20 w-20 shrink-0 items-center justify-center">
                <Image
                  width={80}
                  height={80}
                  src={`/item-bg-${gradeToRarity(grade)}.webp`}
                  alt=""
                  className="absolute object-contain"
                />
                <Image
                  width={62}
                  height={62}
                  src={item_path}
                  alt={item_name}
                  className="absolute object-contain"
                />
              </div>
              {Number(enhance) > 0 ? (
                <span className="absolute -right-1 -top-1 text-xl">
                  +{enhance}
                </span>
              ) : null}
              <span className="absolute -bottom-2 -left-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[3px] border-[#9f916c] bg-[#333] text-base">
                {handleTierValue(tier)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
