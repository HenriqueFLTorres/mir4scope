import Enhance from "@/components/NFTModal/Enhance";
import ItemDetailTooltip from "@/components/NFTModal/ItemDetailTooltip";
import ItemPlaceholder from "@/components/NFTModal/ItemPlaceholder";
import NFTContainer from "@/components/NFTModal/NFTContainer";
import Transcend from "@/components/NFTModal/Transcend";
import Spirit from "@/components/icon/Spirit";
import { completeArray, gradeToRarity } from "@/lib/utils";
import Image from "next/image";

export default function NFTTransferenceEquipment({
  succession,
}: {
  succession: { [key in string]: NFT_SUCCESSION_ITEM };
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
            5,
          ) as (NFT_SUCCESSION_ITEM | null)[]
        ).map((successionItem) =>
          successionItem ? (
            <TransferenceItem
              key={successionItem.item_name}
              {...successionItem}
            />
          ) : (
            <ItemPlaceholder key={"asdfasdf"} />
          ),
        )}
      </div>
    </NFTContainer>
  );
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
      options={options}
      item_name={item_name}
      item_path={item_path}
      power_score={power_score}
    >
      <div className="relative flex h-20 w-20 items-center justify-center">
        <Image
          src={`/bg-${gradeToRarity(grade)}.webp`}
          alt=""
          className="object-contain"
          width={80}
          height={80}
        />
        <Image
          src={item_path}
          alt={item_name}
          className="absolute object-contain"
          width={50}
          height={50}
        />

        <Transcend value={tier} />

        <Enhance value={enhance} />
      </div>
    </ItemDetailTooltip>
  );
}
