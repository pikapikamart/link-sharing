import { 
  int,
  mysqlEnum,
  mysqlTable, 
  varchar} from "drizzle-orm/mysql-core";
import { user } from "./user";
import { relations } from "drizzle-orm";


export const platforms = [
  "github",
  "youtube", 
  "linkedin", 
  "facebook", 
  "frontendmentor", 
  "hashnode", 
  "twitter", 
  "twitch", 
  "devto", 
  "codewars", 
  "freecodecamp", 
  "gitlab", 
  "stackoverflow"
] as const

export const link = mysqlTable("link", {
  id: int("id")
    .autoincrement()
    .primaryKey(),
  platform: mysqlEnum("platform", platforms).notNull(),
  url: varchar("url", { length: 1000 }).notNull(),
  userId: int("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade"
    }),
  position: int("position").notNull()
})

export const linkRelations = relations(link, ({ one, many }) => ({
  user: one(user, {
    fields: [link.userId],
    references: [ user.id ]
  })
}))