import z from "zod"


const MAX_FILE_SIZE = 1024 * 1024 * 5
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
]

export const profileSchema = z.object({
  image: z
    .any()
    .refine(file => file!==undefined, "Please add an image")
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max image size is 5mb")
    .refine((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type), "Only .jpg, .jpeg and.png formats are supported."),
  firstname: z
    .string()
    .min(2, "Atleast 2 letters"),
  lastname: z
    .string()
    .min(2, "Atleast 2 letters"),
  email: z
    .string({ message: "Can't be empty" })
    .email("Invalid email"),
})

export type ProfileSchema = z.TypeOf<typeof profileSchema>
