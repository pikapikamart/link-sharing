import { 
  int,
  mysqlEnum,
  mysqlTable, 
  serial, 
  varchar} from "drizzle-orm/mysql-core";
import { user } from "./user";


export const link = mysqlTable("link", {
  id: serial("id").primaryKey(),
  mysqlEnum: mysqlEnum("platform", [
    "github",
    "youtube", 
    "linkedin", 
    "facebook", 
    "frontendmentor", 
    "hashnode", 
    "web", 
    "twitter", 
    "twitch", 
    "devto", 
    "codewars", 
    "freecodecamp", 
    "gitlab", 
    "stackoverflow"
  ]),
  url: varchar("url", { length: 255 }).notNull(),
  userId: int("user_id").references(() => user.id)
})