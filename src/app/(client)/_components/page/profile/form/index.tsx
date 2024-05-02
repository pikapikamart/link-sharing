import { FormProvider, useForm } from "react-hook-form"
import Form from "./form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"


const MAX_FILE_SIZE = 1024 * 1024 * 5
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
]

const profileSchema = z.object({
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

const ProfileForm = () => {
  const methods = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema)
  })

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  )
}


export { ProfileForm }