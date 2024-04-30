import z from "zod"


export const registerSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email"),
  password: z.string()
})

export type RegisterSchema = z.TypeOf<typeof registerSchema>