import Image from "next/image"
import { toRoman } from "typescript-roman-numbers-converter"

export default function Transcend({ value }: { value: number | string }) {
  if (Number(value) <= 1) return null

  return (
    <div className="absolute -bottom-1 -left-1 flex h-7 w-7 shrink-0 items-center justify-center">
      <Image
        alt={""}
        className="object-contain"
        height={28}
        src={"/icon/spirit-transcend.webp"}
        width={28}
      />
      <p className="absolute">{toRoman(Number(value))}</p>
    </div>
  )
}
