import ItemDetailTooltip from "@/app/@modal/(.)nft/[id]/(components)/ItemDetailTooltip"
import { classIndexToName, gradeToRarity } from "@/lib/utils"
import type { NFTSelectAll } from "@/types/schema"
import Image from "next/image"
import { toRoman } from "typescript-roman-numbers-converter"

export const equip_slot_position = [
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
]

export const equip_order = [1, 9, 5, 6, 7, 8, 2, 3, 4, 10]

export default function NFTEquipmentDisplay({
  equipItems,
  class: classIndex,
}: Pick<NFTSelectAll, "equipItems" | "class">) {
  return (
    <div className="relative mx-10 my-6 flex h-[32rem] w-[32rem] shrink-0">
      <Image
        alt=""
        className="absolute"
        height={512}
        src="/nft/bg-character-equip.webp"
        width={512}
      />

      <Image
        alt=""
        className="fade-image pointer-events-none absolute left-[50%] top-[50%] shrink-0 translate-x-[-50%] translate-y-[-50%] object-contain"
        height={512}
        src={`/class-preview/${classIndexToName(classIndex)}.webp`}
        width={512}
      />

      <ul className="flex items-center justify-center">
        {equip_order.map((key, index) => {
          const {
            enhance,
            grade,
            item_path,
            item_name,
            tier,
            power_score,
            add_option,
            options,
          } = equipItems[key]

          return (
            <li
              className="absolute flex h-20 w-20 items-center gap-2 p-1 text-sm font-bold text-white [&>span]:drop-shadow-[0_0_2px_rgb(0,0,0)]"
              key={item_name}
              style={equip_slot_position[index]}
            >
              <ItemDetailTooltip
                add_option={add_option}
                item_name={item_name}
                item_path={item_path}
                options={options}
                power_score={power_score}
                disable_background
              >
                <div className="flex h-20 w-20 shrink-0 items-center justify-center">
                  <Image
                    alt=""
                    className="absolute object-contain"
                    height={80}
                    src={`/item-bg-${gradeToRarity(grade)}.webp`}
                    width={80}
                  />
                  <Image
                    alt={item_name}
                    className="absolute object-contain"
                    height={62}
                    src={item_path}
                    width={62}
                  />
                </div>
                {Number(enhance) > 0 ? (
                  <span className="absolute -right-1 -top-1 text-xl">
                    +{enhance}
                  </span>
                ) : null}
                <span className="absolute -bottom-2 -left-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[3px] border-[#9f916c] bg-[#333] text-base">
                  {toRoman(Number(tier))}
                </span>
              </ItemDetailTooltip>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
