import { 
  mysqlTable, 
  serial, 
  timestamp, 
  varchar } from "drizzle-orm/mysql-core";


export const users = mysqlTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }),
})