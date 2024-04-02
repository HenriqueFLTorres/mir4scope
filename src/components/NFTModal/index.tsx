"use client";

import { getNft } from "@/lib/get-nft";
import {
  classIndexToName,
  cn,
  getReadableNumber,
  gradeToRarity,
  handleTierValue,
} from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Link } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { NftAssets } from "../../../prisma-types";
import Codex from "../icon/Codex";
import EXP from "../icon/EXP";
import Globe from "../icon/Globe";
import Power from "../icon/Power";
import Wemix from "../icon/Wemix";
import { Dialog, DialogContent } from "../ui/dialog";

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

export default function NFTModal({ seq }: { seq: string }) {
  const router = useRouter();
  const handleClose = () => router.back();
  const { data: nft, isLoading } = useQuery({
    queryKey: ["nft", seq],
    queryFn: () => getNft(seq),
  });

  return (
    <Dialog defaultOpen open onOpenChange={handleClose}>
      <DialogContent className="max-w-[80rem]">
        {isLoading ? (
          <p>asdfasdf</p>
        ) : (
          <section className="relative flex h-[34rem] w-full justify-center gap-16">
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
                src={`/class-preview/${classIndexToName(nft.class)}.webp`}
                alt=""
                className="pointer-events-none absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] object-contain"
              />

              <ul className="grid w-max grid-cols-5 items-center gap-3 p-1">
                {equip_order.map((key, index) => {
                  const { enhance, grade, item_path, item_name, tier } =
                    nft.equip_items[key];

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
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl font-bold">{nft.character_name}</h1>
              <ul className="flex flex-wrap gap-2">
                <NFTChips>
                  <EXP className="h-6 w-6" /> {nft.lvl}
                </NFTChips>
                <NFTChips>
                  <Codex className="h-6 w-6" /> 9,243
                </NFTChips>
                <NFTChips>
                  <Power className="h-6 w-6" />{" "}
                  {getReadableNumber(nft.power_score)}
                </NFTChips>
                <NFTChips>
                  <Globe className="h-6 w-6" /> {nft.world_name}
                </NFTChips>
              </ul>

              <ul className="grid grid-cols-3 gap-2 rounded-md border border-black/20 bg-black/10 px-3 py-1.5 text-lg font-medium">
                <AssetFragment type="copper" assets={nft.assets} />
                <AssetFragment type="energy" assets={nft.assets} />
                <AssetFragment type="darksteel" assets={nft.assets} />
                <AssetFragment type="dragonjade" assets={nft.assets} />
                <AssetFragment type="speedups" assets={nft.assets} />
                <AssetFragment type="acientcoins" assets={nft.assets} />
                <AssetFragment
                  type="dragonsteel"
                  assets={nft.assets}
                  className="col-span-3 justify-center"
                />
              </ul>

              <footer className="mt-auto flex flex-col gap-4">
                <a
                  href={`https://xdraco.com/nft/trade/${nft.seq}`}
                  target="_blank"
                  className="flex h-14 w-full items-center justify-center gap-4 rounded-lg border border-black/20 bg-black/10 px-3 py-1.5 text-lg font-medium transition-colors hover:border-black/40 hover:bg-black/20"
                  rel="noreferrer"
                >
                  <Link /> Open Link
                </a>

                <a
                  href={`https://xdraco.com/nft/trade/${nft.seq}`}
                  target="_blank"
                  className="h-14 rounded-lg bg-gradient-to-b from-[#FF4BAC] to-[#89005A] p-0.5"
                  rel="noreferrer"
                >
                  <span className="flex h-full w-full items-center justify-center gap-4 rounded-lg bg-gradient-to-r from-[#140000] via-[#320030] to-[#140000] px-3 py-1.5 text-lg font-medium transition-colors hover:border-black/40 hover:bg-black/20">
                    <Wemix className="h-6 w-6" /> {getReadableNumber(nft.price)}
                  </span>
                </a>
              </footer>
            </div>
          </section>
        )}
      </DialogContent>
    </Dialog>
  );
}

function NFTChips({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex w-max items-center gap-2 rounded-md border border-black/20 bg-black/10 px-3 py-1.5 text-lg font-medium">
      {children}
    </span>
  );
}

function AssetFragment({
  type,
  assets,
  className,
}: {
  type: NftAssets;
  assets: { [key in NftAssets]: string };
  className?: string;
}) {
  const valueAsNumber = Number(assets[type]);
  const isNumberValid = Number.isInteger(valueAsNumber);

  return (
    <li className={cn("flex items-center gap-2", className)}>
      <Image src={`/icon/copper.webp`} alt="" width={32} height={32} />
      {isNumberValid ? getReadableNumber(valueAsNumber) : 0}
    </li>
  );
}
