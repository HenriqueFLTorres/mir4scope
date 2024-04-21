import NFTContainer from "@/components/NFTModal/NFTContainer";
import Skill from "@/components/icon/Skill";
import Image from "next/image";

export default function NFTTraining({ training }: { training: NFT_TRAINING }) {
  return (
    <NFTContainer className="col-span-2">
      <header className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skill className="h-8 w-8" />
          <h2 className="text-xl font-semibold">Training</h2>
        </div>
      </header>

      <div className="flex w-full items-start justify-center gap-4">
        <TrainingFragment name="Constitution" tier={training?.constitution} />
        {Object.entries(training?.chi).map(([name, value]) => (
          <TrainingFragment
            key={name}
            name={name}
            tier={String(value ?? 0)}
            isChi
          />
        ))}
        <TrainingFragment
          name={training?.collect_name}
          tier={training?.collect_level}
        />
      </div>
    </NFTContainer>
  );
}

function TrainingFragment({
  tier,
  name,
  isChi = false,
}: {
  tier: number | string;
  name: string;
  isChi?: boolean;
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
        {isChi && (
          <Image
            src={`/training/${name.replace(/\s/g, "_").toLowerCase()}.webp`}
            alt=""
            width={80}
            height={80}
            className="absolute opacity-50"
          />
        )}
        <p className="absolute mb-12 translate-x-[0.125rem] text-center font-medium tracking-[0.3em] drop-shadow-[0px_0px_2px_rgba(0,0,0,150)]">
          TIER
        </p>
        <h3 className="text-center text-2xl font-extrabold drop-shadow-[0px_0px_2px_rgba(0,0,0,150)]">
          {tier}
        </h3>
      </div>
      <h4 className="text-center text-base font-bold">{name}</h4>
    </div>
  );
}
