import { platforms } from "@/app/_server/database/schema"
import z from "zod"


export const linksSchema = z.object({
  links: z.array(z.object({
    platform: z
      .enum(platforms),
    url: z
      .string()
      .url("Please check the url")
  }))
})

export type LinksSchema = z.TypeOf<typeof linksSchema>