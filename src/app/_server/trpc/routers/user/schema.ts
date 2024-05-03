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
    }, "Dimension must be below 1024")
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
