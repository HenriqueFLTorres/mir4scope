import Image from "next/image"
import NFTContainer from "@/app/@modal/(.)nft/[id]/(components)/container"
import { Skill } from "@/components/other"

export default function NFTPotentials({
  potentials,
}: {
  potentials: NFT_POTENTIAL
}) {
  return (
    <NFTContainer className="relative items-center justify-center gap-4 overflow-hidden">
      <Image
        alt=""
        className="absolute z-[-1] object-cover opacity-30"
        height={768}
        src={"/potential/background.webp"}
        width={768}
      />

      <header className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skill className="h-8 w-8" />
          <h2 className="text-xl font-semibold">Potential</h2>
        </div>
      </header>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col justify-center text-center">
          <h3 className="text-xl font-medium">Total</h3>
          <p className="text-2xl font-extrabold">
            {potentials?.total} / {potentials?.total_max}
          </p>
        </div>

        <div className="flex w-full justify-around gap-4 px-4">
          <div className="flex flex-col items-center">
            <Image
              alt=""
              className="translate-y-6 object-contain"
              height={96}
              src={"/potential/hunt.webp"}
              width={96}
            />
            <p className="flex flex-col justify-center text-center text-sm font-medium">
              Hunt
              <strong className="text-base font-extrabold">
                {potentials?.hunting} / {potentials?.hunting_max}
              </strong>
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Image
              alt=""
              className="translate-y-6 object-contain"
              height={96}
              src={"/potential/pvp.webp"}
              width={96}
            />
            <p className="flex flex-col justify-center text-center text-sm font-medium">
              PvP
              <strong className="text-base font-extrabold">
                {potentials?.pvp} / {potentials?.pvp_max}
              </strong>
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Image
              alt=""
              className="translate-y-6 object-contain"
              height={96}
              src={"/potential/secondary.webp"}
              width={96}
            />
            <p className="flex flex-col justify-center text-center text-sm font-medium">
              Secondary
              <strong className="text-base font-extrabold">
                {potentials?.secondary} / {potentials?.secondary_max}
              </strong>
            </p>
          </div>
        </div>
      </div>
    </NFTContainer>
  )
}
