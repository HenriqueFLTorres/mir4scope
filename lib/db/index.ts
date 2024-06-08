import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

if (process.env.DATABASE_URL == null) {
  throw new Error("DATABASE_URL environment variable is required.")
}

const client = postgres(process.env.DATABASE_URL, {
  prepare: false,
  max: 1,
  connection: {
    application_name: "mir4scope-front-end",
  },
})

export const db = drizzle(client)
