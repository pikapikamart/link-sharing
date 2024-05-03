import { useSession } from "next-auth/react"
import { 
  SubmitHandler, 
  useFormContext} from "react-hook-form"
import { updateProfileAction } from "./actions"
import { 
  setUser, 
  useUserStore } from "@/app/(client)/_store/user"
import { useAction } from "next-safe-action/hooks"
import z from "zod"


const MAX_FILE_SIZE = 1024 * 1024 * 5
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
]

type Dimension = {
  height: number
  width: number
}

export const profileSchema = z.object({
  image: z
    .string()
    .or(z
      .any()
      .refine(file => file!==undefined, "Please add an image")
      .refine((file) => file?.size <= MAX_FILE_SIZE, "Max image size is 5mb")
      .refine((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type), "Only .jpg, .jpeg and.png formats are supported.")
      .refine(async (file) => {
        const fileAsDataURL = window.URL.createObjectURL(file)
        const image = new Image()
        image.onload = () => {
          
        }
        image.src = fileAsDataURL
  
        const getHeightAndWidthFromDataUrl = (dataURL: string) => new Promise(resolve => {
          const img = new Image()
          img.onload = () => {
            resolve({
              height: img.height,
              width: img.width
            })
          }
          img.src = dataURL
        })
        const dimensions = await getHeightAndWidthFromDataUrl(fileAsDataURL) as unknown as Dimension
        
        return dimensions.height <= 1024 && dimensions.width <= 1024
      }, "Dimension must be below 1024"))
    .optional(),
  firstName: z
    .string()
    .min(2, "Atleast 2 letters"),
  lastName: z
    .string()
    .min(2, "Atleast 2 letters"),
  email: z
    .string({ message: "Can't be empty" })
    .email("Invalid email"),
})

export type ProfileSchema = z.TypeOf<typeof profileSchema>

export const useProfileForm = () =>{
  const {
    register, 
    formState: {
      errors: formErrors
    },
    handleSubmit,
    control,
    watch } = useFormContext<ProfileSchema>()
  const { data: session } = useSession()
  const user = useUserStore()
  const { execute } = useAction(updateProfileAction, {
    onSuccess: data => {
      if ( data.success ) {
        setUser({ ...data.user })          
      }
    },
  })

  const handleFormSubmit: SubmitHandler<ProfileSchema> = async(data) => {
    if ( !session?.user ) return

    data.email = user.email
    const fd = new FormData()

    for (const [k, v] of Object.entries(data)) {
      fd.append(k, v)
    }

    execute(fd)
  }
 
  return {
    register,
    formErrors,
    control,
    watch,
    handleSubmit: handleSubmit(handleFormSubmit)
  }
}