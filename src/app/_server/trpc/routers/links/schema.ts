import z from "zod"


export const linksSchema = z.object({
  links: z.array(z.object({
    platform: z
      .enum(["", "github", "youtube", "linkedin", "facebook", "frontendmentor", "hashnode", "web", "twitter", "twitch", "devto", "codewars", "freecodecamp", "gitlab", "stackoverflow"]),
    url: z
      .string()
      .url("Please check the url")
  }))
})

export type LinksSchema = z.TypeOf<typeof linksSchema>