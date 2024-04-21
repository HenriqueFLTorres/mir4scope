import NFTContainer from "@/components/NFTModal/NFTContainer";
import Skill from "@/components/icon/Skill";
import Image from "next/image";

export default function NFTMystique({
  holy_stuff,
}: {
  holy_stuff: { [key in NFT_MYSTIQUE]: string };
}) {
  return (
    <NFTContainer className="gap-12">
      <header className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skill className="h-8 w-8" />
          <h2 className="text-xl font-semibold">Mystique</h2>
        </div>
      </header>

      <ul className="flex gap-4">
        {(Object.entries(holy_stuff) as [NFT_MYSTIQUE, string][]).map(
          ([name, tier]) => (
            <li key={name}>
              <MystiqueFragment name={name} tier={tier} />
            </li>
          ),
        )}
      </ul>
    </NFTContainer>
  );
}

function MystiqueFragment({
  tier,
  name,
}: {
  tier: number | string;
  name: NFT_MYSTIQUE;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center">
        <Image
          src={"/training-frame.webp"}
          alt=""
          width={80}
          height={80}
          className="absolute"
        />
        <Image
          src={`/mystique/${name.toLowerCase().replace(/\s/g, "_")}.webp`}
          alt=""
          width={80}
          height={80}
          className="absolute mb-8"
        />
        <p className="absolute mb-12 translate-x-[0.125rem] text-center font-medium tracking-[0.3em] drop-shadow-[0px_0px_2px_rgba(0,0,0,150)]">
          TIER
        </p>
        <h3 className="text-center text-2xl font-extrabold drop-shadow-[0px_0px_2px_rgba(0,0,0,150)]">
          {tier}
        </h3>
      </div>
      <h4 className="text-center text-sm font-bold">{name}</h4>
    </div>
  );
}
