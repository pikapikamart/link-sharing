import z from "zod"


export const registerSchema = z.object({
  email: z
    .string({ message: "Can't be empty" })
    .email("Invalid email"),
  password: z
    .string({ message: "Can't be empty" })
    .min(8, "Please check again")
})

export type RegisterSchema = z.TypeOf<typeof registerSchema>