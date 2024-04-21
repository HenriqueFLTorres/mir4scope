import Image from "next/image";

export default function ItemPlaceholder() {
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
