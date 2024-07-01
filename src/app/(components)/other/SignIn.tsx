"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/elements/avatar"
import { Button } from "@/components/ui/elements/button"
import { User } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"

export default function SignIn() {
  const { data: session } = useSession()

  if (session != null && session.user != null && session.user.image != null) {
    return (
      <div className="absolute left-0 flex flex-row items-center justify-center gap-2">
        <Avatar>
          <AvatarImage src={session.user?.image} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <Button onClick={() => signOut()} className="bg-black/0">
          Sign Out
        </Button>
      </div>
    )
  }
  return (
    <Button onClick={() => signIn("google")} className="absolute left-0">
      Sign In
    </Button>
  )
}
