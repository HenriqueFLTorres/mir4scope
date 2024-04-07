import { getRelativePercentage } from "@/lib/utils";
import type { NftCodexObject } from "../../../prisma-types";
import Codex from "../icon/Codex";
import NFTContainer from "./NFTContainer";

export default function NFTCodex({
  codex,
}: {
  codex: { [key in string]: NftCodexObject };
}) {
  return (
    <NFTContainer className="col-span-2">
      <header className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Codex className="h-8 w-8" />
          <h2 className="text-xl font-semibold">Codex</h2>
        </div>
      </header>

      <div className="flex w-full justify-center gap-4">
        {(Object.values(codex) as NftCodexObject[]).map((nftObject) => (
          <CodexFragment key={nftObject.codex_name} {...nftObject} />
        ))}
      </div>
    </NFTContainer>
  );
}

function CodexFragment({
  codex_name,
  completed,
  in_progress,
  total_count,
}: NftCodexObject) {
  const completedPercentage = getRelativePercentage(
    Number(in_progress) + Number(completed),
    total_count,
  );
  return (
    <div className="relative flex flex-col items-center rounded-lg bg-black/10 p-4 text-center text-sm drop-shadow-lg">
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-[-1] h-0 w-full rounded-lg bg-[#368d6f2e]"
        style={{ height: `${completedPercentage}%` }}
      />
      <h3 className="font-bold">{codex_name}</h3>

      <div className="my-4 flex flex-col font-medium">
        <p>
          {Number(in_progress) + Number(completed)} / {total_count}
        </p>
        <small>{`${completedPercentage.toFixed(2)}%`}</small>
      </div>

      <p className="font-medium text-[#9C9C9C]">
        In Progress{" "}
        <strong className="font-semibold text-white">{in_progress}</strong>
      </p>
      <p className="font-medium text-[#368D6E]">
        Completed{" "}
        <strong className="font-semibold text-white">{completed}</strong>
      </p>
    </div>
  );
}