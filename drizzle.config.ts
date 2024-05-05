import { defineConfig } from 'drizzle-kit'


export default defineConfig({
  schema: "./src/app/_server/database/schema",
  out: "./src/app/_server/database/migrations",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.NODE_ENV==="development"? process.env.DB_URI as string : process.env.DB_URI_PROD as string
  },
  verbose: true,
  strict: true,
})