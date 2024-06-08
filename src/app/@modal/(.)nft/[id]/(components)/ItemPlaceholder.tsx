import Image from "next/image"

export default function ItemPlaceholder() {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      <Image
        alt=""
        className="object-contain"
        height={80}
        src={"/icon/spirit-none.webp"}
        width={80}
      />
    </div>
  )
}
