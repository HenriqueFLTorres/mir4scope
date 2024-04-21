import NFTContainer from "@/components/NFTModal/NFTContainer";
import Skill from "@/components/icon/Skill";
import Image from "next/image";

export default function NFTPotentials({
  potentials,
}: {
  potentials: NFT_POTENTIAL;
}) {
  return (
    <NFTContainer className="relative items-center justify-center gap-4 overflow-hidden">
      <Image
        src={"/potential/background.webp"}
        alt=""
        width={768}
        height={768}
        className="absolute z-[-1] object-cover opacity-30"
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
              src={"/potential/hunt.webp"}
              alt=""
              width={96}
              height={96}
              className="translate-y-6 object-contain"
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
              src={"/potential/pvp.webp"}
              alt=""
              width={96}
              height={96}
              className="translate-y-6 object-contain"
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
              src={"/potential/secondary.webp"}
              alt=""
              width={96}
              height={96}
              className="translate-y-6 object-contain"
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
  );
}
