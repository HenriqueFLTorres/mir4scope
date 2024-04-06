export default function Enhance({ value }: { value: string | number }) {
  if (Number(value) < 1) return null;

  return (
    <p className="absolute -right-1 -top-1 flex h-7 w-7 shrink-0 items-center justify-center font-bold drop-shadow">
      +{value}
    </p>
  );
}
