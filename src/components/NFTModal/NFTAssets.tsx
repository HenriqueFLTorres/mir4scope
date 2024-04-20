import { cn, getReadableNumber } from "@/lib/utils";
import Image from "next/image";

type assets_type = { [key in NFT_ASSETS_ENUM]: string };

export default function NFTAssets({ assets }: { assets: assets_type }) {
  return (
    <ul className="grid grid-cols-3 gap-2 rounded-md border border-black/20 bg-black/10 px-3 py-1.5 text-lg font-medium">
      <AssetFragment type="copper" assets={assets} />
      <AssetFragment type="energy" assets={assets} />
      <AssetFragment type="darksteel" assets={assets} />
      <AssetFragment type="dragonjade" assets={assets} />
      <AssetFragment type="speedups" assets={assets} />
      <AssetFragment type="acientcoins" assets={assets} />
      <AssetFragment
        type="dragonsteel"
        assets={assets}
        className="col-span-3 justify-center"
      />
    </ul>
  );
}

function AssetFragment({
  type,
  assets,
  className,
}: {
  type: NFT_ASSETS_ENUM;
  assets: assets_type;
  className?: string;
}) {
  const valueAsNumber = Number(assets[type]);
  const isNumberValid = Number.isInteger(valueAsNumber);

  return (
    <li className={cn("flex items-center gap-2", className)}>
      <Image src={`/icon/${type}.webp`} alt="" width={32} height={32} />
      {isNumberValid ? getReadableNumber(valueAsNumber) : 0}
    </li>
  );
}
