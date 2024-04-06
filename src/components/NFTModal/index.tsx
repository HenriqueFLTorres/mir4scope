"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { getNft } from "@/lib/get-nft";
import { completeArray, getReadableNumber } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import Wemix from "../icon/Wemix";
import NFTAssets from "./NFTAssets";
import NFTEquipmentDisplay from "./NFTEquipmentDisplay";
import NFTTags from "./NFTTags";
import NFTContainer from "./NFTContainer";
import Spirit from "../icon/Spirit";
import Image from "next/image";
import { toRoman } from "typescript-roman-numbers-converter";
import type { NftMagicOrb, NftSpirit } from "../../../prisma-types";

export default function NFTModal({ seq }: { seq: string }) {
  const router = useRouter();
  const handleClose = () => router.back();
  const { data: nft, isLoading } = useQuery({
    queryKey: ["nft", seq],
    queryFn: () => getNft(seq),
  });

  console.log(
    completeArray(
      Object.values((nft?.magic_orb?.equip_item?.[1] as NftMagicOrb[]) ?? []),
      5,
    ),
  );

  return (
    <Sheet defaultOpen open onOpenChange={handleClose}>
      <SheetContent>
        {isLoading ? (
          <p>asdfasdf</p>
        ) : (
          <>
            <section className="relative mb-16 flex h-[34rem] w-full justify-center gap-16">
              <NFTEquipmentDisplay
                class={nft.class}
                equip_items={nft.equip_items}
              />
              <div className="flex flex-col gap-6">
                <h1 className="text-4xl font-bold">{nft.character_name}</h1>
                <NFTTags {...nft} />

                <NFTAssets assets={nft.assets} />

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
                      <Wemix className="h-6 w-6" />{" "}
                      {getReadableNumber(nft.price)}
                    </span>
                  </a>
                </footer>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-4">
              <NFTContainer
                Icon={<Spirit className="h-8 w-8" />}
                title="Spirit"
                availableSetsIndex={Object.keys(nft?.spirits?.equip)}
              >
                {(currentSetIndex) =>
                  Object.values(
                    (nft?.spirits?.equip?.[currentSetIndex] as NftSpirit[]) ??
                      [],
                  ).map(({ grade, icon_path, pet_name, transcend }) => (
                    <div
                      key={pet_name}
                      className="relative flex h-20 w-20 items-center justify-center"
                    >
                      <Image
                        src={
                          grade === 5 ? "/bg-legendary.webp" : "/bg-epic.webp"
                        }
                        alt=""
                        className="object-contain"
                        width={80}
                        height={80}
                      />
                      <Image
                        src={icon_path}
                        alt={pet_name}
                        className="absolute object-contain"
                        width={50}
                        height={50}
                      />
                      {transcend > 1 && (
                        <div className="absolute -bottom-1 -left-1 flex h-7 w-7 shrink-0 items-center justify-center">
                          <Image
                            src={"/icon/spirit-transcend.webp"}
                            alt={""}
                            className="object-contain"
                            width={28}
                            height={28}
                          />
                          <p className="absolute">{toRoman(transcend)}</p>
                        </div>
                      )}
                    </div>
                  ))
                }
              </NFTContainer>

              <NFTContainer
                Icon={<Spirit className="h-8 w-8" />}
                title="Magical Soul Orb"
                availableSetsIndex={Object.keys(nft?.magic_orb?.equip_item)}
              >
                {(currentSetIndex) =>
                  completeArray(
                    Object.values(
                      (nft?.magic_orb?.equip_item?.[
                        currentSetIndex
                      ] as NftMagicOrb[]) ?? [],
                    ),
                    5,
                  ).map((item) => {
                    if (!item) return <ItemPlaceholder />;

                    const {
                      grade,
                      item_exp,
                      item_idx,
                      item_level,
                      item_name,
                      item_path,
                      tier,
                    } = item;

                    return (
                      <div
                        key={item_name}
                        className="relative flex h-20 w-20 items-center justify-center"
                      >
                        <Image
                          src={
                            Number(grade) === 5
                              ? "/bg-legendary.webp"
                              : "/bg-epic.webp"
                          }
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

                        <div className="absolute -bottom-1 -left-1 flex h-7 w-7 shrink-0 items-center justify-center">
                          <Image
                            src={"/icon/spirit-transcend.webp"}
                            alt={""}
                            className="object-contain"
                            width={28}
                            height={28}
                          />
                          <p className="absolute">{toRoman(item_level)}</p>
                        </div>
                      </div>
                    );
                  })
                }
              </NFTContainer>
            </section>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function ItemPlaceholder() {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      <Image
        src={"/icon/spirit-none.webp"}
        alt=""
        className="object-contain"
        width={80}
        height={80}
      />
    </div>
  );
}
