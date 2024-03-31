import NFTModal from "@/components/NFTModal";
import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mir4 Scope",
  description: "Analysis and assistance tool for finding and buying mir4 NFTs",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Providers>
          {modal}
          {children}
          <div id="modal-root" />
        </Providers>
      </body>
    </html>
  );
}
