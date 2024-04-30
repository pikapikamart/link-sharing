import { defineConfig } from 'drizzle-kit'


export default defineConfig({
  schema: "./src/app/_server/database/schema",
  out: "./src/app/_server/database/migrations",
  driver: "mysql2",
  dbCredentials: {
    host: process.env.DB_HOST as string,
    port: process.env.DB_PORT as unknown as number,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string
  },
  verbose: true,
  strict: true,
})