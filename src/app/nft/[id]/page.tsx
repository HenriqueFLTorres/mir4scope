import Link from "next/link";
import { redirect } from "next/navigation";

export default function NFTModalPage() {
  redirect("/");

  return (
    <section className="py-24">
      <div className="container">
        <div>
          <Link
            href="/"
            className="font-semibold italic text-sky-600 underline"
          >
            Back to main page
          </Link>
        </div>

        <div className="mt-10 w-1/3">
          <pre>nft/[id]/page.tsx</pre>
        </div>
      </div>
    </section>
  );
}
