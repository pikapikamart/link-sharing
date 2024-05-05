import { defineConfig } from 'drizzle-kit'


export default defineConfig({
  schema: "./src/app/_server/database/schema",
  out: "./src/app/_server/database/migrations",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.DB_URI as string
  },
  verbose: true,
  strict: true,
})