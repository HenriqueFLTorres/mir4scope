import Power from "@/components/icon/Power";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileText } from "lucide-react";
import Image from "next/image";
import type { NftEquipItem } from "../../../prisma-types";

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
  children: React.ReactNode;
  item_name: string;
  item_path: string;
  power_score?: number;
  options: NftEquipItem["options"];
  add_option: NftEquipItem["add_option"];
  disable_background?: boolean;
  no_detail?: boolean;
}) {
  return (
    <TooltipProvider disableHoverableContent={true} delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          collisionPadding={16}
          className="flex flex-col items-center justify-center gap-6"
        >
          <h2 className="w-full text-xl font-semibold drop-shadow-md">
            {item_name}
          </h2>

          {no_detail ? null : (
            <ItemDetail
              power_score={power_score}
              add_option={add_option}
              options={options}
            />
          )}

          {disable_background ? (
            <></>
          ) : (
            <Image
              src={item_path}
              alt=""
              width={64}
              height={64}
              className="pointer-events-none absolute z-[-1] scale-[3] object-contain opacity-60 blur-md"
            />
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function ItemDetail({
  power_score,
  options,
  add_option,
}: {
  power_score?: number;
  options: NftEquipItem["options"];
  add_option: NftEquipItem["add_option"];
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
  );
}
