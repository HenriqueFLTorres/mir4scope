import "@/app/globals.css";
import { Providers } from "@/components/providers";
import { Button } from "@/components/ui/elements/button";
import { cn } from "@/lib/cn";
import { Eye, Gamepad2, PieChart, ScrollText } from "lucide-react";
import type { Metadata } from "next";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { Rubik } from "next/font/google";
import SignIn from "./(components)/other/SignIn";
import NextAuthProvider from "./_providers/NextAuthProvider";

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
      <body
        className={cn(
          rubik.className,
          "flex flex-col gap-4 min-h-screen bg-gradient-to-br from-[#44356A] to-[#272039]",
        )}
      >
        <Providers>
          <header className="flex flex-row items-center justify-center pb-3 py-3 w-full bg-black/20 text-white">
            <nav className="flex relative max-w-screen-2xl w-full items-center justify-center">
              <SignIn />

              <div className="flex gap-3">
                <Button>
                  <Eye /> Character Watcher
                </Button>
                <Button>
                  <PieChart /> Analytics
                </Button>
                <Button>
                  <Gamepad2 /> In-Game NFT's
                </Button>
                <Button>
                  <ScrollText /> NFT Logs
                </Button>
              </div>
            </nav>
          </header>
          {modal}
          {children}
          <div id="modal-root" />
        </Providers>
      </body>
    </html>
  );
}
