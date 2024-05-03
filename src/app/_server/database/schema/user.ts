import { relations } from "drizzle-orm";
import { 
  int,
  mysqlTable, 
  varchar } from "drizzle-orm/mysql-core";
import { link } from "./link";


export const user = mysqlTable("user", {
  id: int("id")
    .autoincrement()
    .primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  firstName: varchar("firstName", { length: 255 }),
  lastName: varchar("lastName", { length: 255 }),
  image: varchar("image", { length: 255 }),
  username: varchar("username", { length: 255 }).notNull()
})

export const userRelations = relations(user, ({ one, many }) => ({
  links: many(link)
}))