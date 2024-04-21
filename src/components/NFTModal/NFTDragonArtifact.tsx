import Enhance from "@/components/NFTModal/Enhance";
import ItemDetailTooltip from "@/components/NFTModal/ItemDetailTooltip";
import NFTContainer from "@/components/NFTModal/NFTContainer";
import Transcend from "@/components/NFTModal/Transcend";
import Spirit from "@/components/icon/Spirit";
import { gradeToRarity } from "@/lib/utils";
import Image from "next/image";

const DRAGON_ARTIFACT_SEQUENCE_INDEX = [11, 12, 13, 14, 15];

export default function NFTDragonArtifact({
  equip_items,
}: {
  equip_items: { [key in string]: NFT_EQUIP_ITEM };
}) {
  return (
    <NFTContainer>
      <header className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Spirit className="h-8 w-8" />
          <h2 className="text-xl font-semibold">Dragon Artifact</h2>
        </div>
      </header>

      <div className="flex flex-row gap-4">
        {prepareDragonArtifacts(equip_items).map(([key, equip_item]) =>
          equip_item ? (
            <ArtifactItem key={equip_item.item_name} {...equip_item} />
          ) : (
            <Image
              key={key}
              src={ArtifactKeyToImagePath(key)}
              alt=""
              className="object-contain"
              width={80}
              height={80}
            />
          ),
        )}
      </div>
    </NFTContainer>
  );
}

function ArtifactItem({
  grade,
  item_name,
  item_path,
  tier,
  enhance,
  add_option,
  options,
  power_score,
}: NFT_EQUIP_ITEM) {
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
          src={`/artifact/${gradeToRarity(grade)}-frame.webp`}
          alt=""
          className="object-contain"
          width={80}
          height={80}
        />
        <Image
          src={item_path}
          alt={item_name}
          className="absolute object-contain"
          width={40}
          height={40}
        />

        <Transcend value={tier} />

        <Enhance value={enhance} />
      </div>
    </ItemDetailTooltip>
  );
}

function prepareDragonArtifacts(
  obj: { [key in string]: NFT_EQUIP_ITEM | null } = {},
): [string, NFT_EQUIP_ITEM | null][] {
  const newObj = { ...obj };
  for (const objectKey of Object.keys(newObj)) {
    if (!DRAGON_ARTIFACT_SEQUENCE_INDEX.includes(Number(objectKey)))
      delete newObj[objectKey];
  }

  for (const key of DRAGON_ARTIFACT_SEQUENCE_INDEX) {
    if (!(key in newObj)) {
      newObj[key] = null;
    }
  }

  return Object.entries(newObj);
}

function ArtifactKeyToImagePath(key: string) {
  switch (key) {
    case "11":
      return "/artifact/specter-placeholder.webp";
    case "12":
      return "/artifact/cape-placeholder.webp";
    case "13":
      return "/artifact/crown-placeholder.webp";
    case "14":
      return "/artifact/seal-placeholder.webp";
    case "15":
      return "/artifact/tome-placeholder.webp";
    default:
      throw new Error(`Unknown artifact key: ${key}`);
  }
}
