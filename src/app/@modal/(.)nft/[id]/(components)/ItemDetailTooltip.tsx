import { FileText } from "lucide-react"
import Image from "next/image"
import { Power } from "@/components/other"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui"

export default function ItemDetailTooltip({
  children,
  item_name,
  item_path,
  power_score,
  options,
  add_option,
  disable_background = false,
  no_detail = false,
}: {
  children: React.ReactNode
  item_name: string
  item_path: string
  power_score?: number
  options: NFT_EQUIP_ITEM["options"]
  add_option: NFT_EQUIP_ITEM["add_option"]
  disable_background?: boolean
  no_detail?: boolean
}) {
  return (
    <TooltipProvider delayDuration={0} disableHoverableContent={true}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          className="flex flex-col items-center justify-center gap-6"
          collisionPadding={16}
        >
          <h2 className="w-full text-xl font-semibold drop-shadow-md">
            {item_name}
          </h2>

          {no_detail ? null : (
            <ItemDetail
              add_option={add_option}
              options={options}
              power_score={power_score}
            />
          )}

          {disable_background ? (
            <></>
          ) : (
            <Image
              alt=""
              className="pointer-events-none absolute z-[-1] scale-[3] object-contain opacity-60 blur-md"
              height={64}
              src={item_path}
              width={64}
            />
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function ItemDetail({
  power_score,
  options,
  add_option,
}: {
  power_score?: number
  options: NFT_EQUIP_ITEM["options"]
  add_option: NFT_EQUIP_ITEM["add_option"]
}) {
  return (
    <>
      {options.length > 0 || add_option.length > 0 ? (
        <ul className="flex w-full flex-col gap-2 font-normal leading-none drop-shadow-md [&>li]:flex [&>li]:items-center [&>li]:gap-4">
          <li>
            <Power className="h-4 w-4" /> Power Score{" "}
            <strong className="ml-auto font-bold">{power_score}</strong>
          </li>
          {Object.values(options).map(({ name, value, format }, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <li key={`${name}-${index}`}>
              {name}{" "}
              <strong className="ml-auto font-bold">
                {value}
                {format}
              </strong>
            </li>
          ))}

          <br />

          {Object.values(add_option).map(({ name, value, format }, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <li key={`${name}-${index}`}>
              {name}{" "}
              <strong className="ml-auto font-bold">
                {value}
                {format}
              </strong>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 p-4 drop-shadow-md">
          <FileText />
          <p className="text-center text-base">
            No details about this item were found.
          </p>
        </div>
      )}
    </>
  )
}
