import Image from "next/image"
import { cn, getReadableNumber } from "@/lib/utils"

type assets_type = { [key in NFT_ASSETS_ENUM]: string }

export default function NFTAssets({ assets }: { assets: assets_type }) {
  return (
    <ul className="grid grid-cols-3 gap-2 rounded-md border border-black/20 bg-black/10 px-3 py-1.5 text-lg font-medium">
      <AssetFragment assets={assets} type="copper" />
      <AssetFragment assets={assets} type="energy" />
      <AssetFragment assets={assets} type="darksteel" />
      <AssetFragment assets={assets} type="dragonjade" />
      <AssetFragment assets={assets} type="speedups" />
      <AssetFragment assets={assets} type="acientcoins" />
      <AssetFragment
        assets={assets}
        className="col-span-3 justify-center"
        type="dragonsteel"
      />
    </ul>
  )
}

function AssetFragment({
  type,
  assets,
  className,
}: {
  type: NFT_ASSETS_ENUM
  assets: assets_type
  className?: string
}) {
  const valueAsNumber = Number(assets[type])
  const isNumberValid = Number.isInteger(valueAsNumber)

  return (
    <li className={cn("flex items-center gap-2", className)}>
      <Image alt="" height={32} src={`/icon/${type}.webp`} width={32} />
      {isNumberValid ? getReadableNumber(valueAsNumber) : 0}
    </li>
  )
}
