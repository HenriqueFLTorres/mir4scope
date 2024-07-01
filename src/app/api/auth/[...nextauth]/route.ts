import { insertUser, selectUserByEmail } from "@/drizzle/schema"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

if (process.env.GOOGLE_CLIENT_ID == null)
  throw new Error("GOOGLE_CLIENT_ID is not set")
if (process.env.GOOGLE_CLIENT_SECRET == null)
  throw new Error("GOOGLE_CLIENT_SECRET is not set")

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const userToSave = {
        name: user.name,
        email: user.email,
        is_premium: false,
      }

      if (user.email == null) {
        return false
      }

      const userInDb = await selectUserByEmail(user.email)

      if (userInDb.length >= 1) {
        return true
      }

      insertUser(userToSave)

      return true
    },
  },
})

export { handler as GET, handler as POST }
