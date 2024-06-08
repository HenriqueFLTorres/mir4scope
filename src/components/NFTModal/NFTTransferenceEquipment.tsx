import Image from "next/image"
import Spirit from "@/components/icon/Spirit"
import Enhance from "@/components/NFTModal/Enhance"
import ItemDetailTooltip from "@/components/NFTModal/ItemDetailTooltip"
import ItemPlaceholder from "@/components/NFTModal/ItemPlaceholder"
import NFTContainer from "@/components/NFTModal/NFTContainer"
import Transcend from "@/components/NFTModal/Transcend"
import { completeArray, gradeToRarity } from "@/lib/utils"

export default function NFTTransferenceEquipment({
  succession,
}: {
  succession: { [key in string]: NFT_SUCCESSION_ITEM }
}) {
  return (
    <NFTContainer>
      <header className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Spirit className="h-8 w-8" />
          <h2 className="text-xl font-semibold">Transference Equipment</h2>
        </div>
      </header>

      <div className="flex flex-row gap-4">
        {(
          completeArray(
            Object.values(succession),
            5
          ) as (NFT_SUCCESSION_ITEM | null)[]
        ).map((successionItem) =>
          successionItem ? (
            <TransferenceItem
              key={successionItem.item_name}
              {...successionItem}
            />
          ) : (
            <ItemPlaceholder key={"asdfasdf"} />
          )
        )}
      </div>
    </NFTContainer>
  )
}

function TransferenceItem({
  grade,
  item_name,
  item_path,
  tier,
  enhance,
  refine_step,
  trance_step,
  add_option,
  options,
  power_score,
}: NFT_SUCCESSION_ITEM) {
  return (
    <ItemDetailTooltip
      add_option={add_option}
      item_name={item_name}
      item_path={item_path}
      options={options}
      power_score={power_score}
    >
      <div className="relative flex h-20 w-20 items-center justify-center">
        <Image
          alt=""
          className="object-contain"
          height={80}
          src={`/bg-${gradeToRarity(grade)}.webp`}
          width={80}
        />
        <Image
          alt={item_name}
          className="absolute object-contain"
          height={50}
          src={item_path}
          width={50}
        />

        <Transcend value={tier} />

        <Enhance value={enhance} />
      </div>
    </ItemDetailTooltip>
  )
}
