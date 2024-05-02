"use server"
import { db } from "@/app/_server/database"
import { user } from "@/app/_server/database/schema"
import { profileSchema } from "@/app/_server/trpc/routers/user/schema"
import { eq } from "drizzle-orm"
import { Session } from "next-auth"
import cloudinary from "@/app/_server/utils/cloudinary"
import { File } from "buffer"


export const updateProfile = async(userSession: Session, form: FormData) =>{
  const input: {[k: string]: any} = {}
  
  for ( const [k, v] of form.entries()) {
    input[k] = v
  }

  if ( !userSession.user ) {

    return {
      error: true,
      data: "user:Login first"
    }
  }

  const validatedFields = profileSchema.safeParse(input)

  if ( !validatedFields.success ) {

    return {
      error: true,
      data: validatedFields.error.flatten().fieldErrors
    }
  }

  const foundUser = await db.query.user.findFirst({
    where: eq(user.email, userSession.user?.email as string)
  })

  if ( !foundUser ) {

    return {
      error: true,
      data: "user:Login first"
    }
  }

  let userImage: null | string = null

  if ( foundUser.image===null && typeof validatedFields.data.image!=="string" ) {
    const createImage = async (img: File) => {
      const arrayBuffer = await img.arrayBuffer()
      const buffer = new Uint8Array(arrayBuffer)
      const result = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream({
          folder: "link-sharing",
          upload_preset: "link-sharing"
        }, (error, result) => {
          if ( error ) {

            return reject(error)
          }

          return resolve(result?.url)
        },).end(buffer)

      })
      
      if ( typeof result === "string" ) {
        userImage = result
      }
    }

    await createImage(validatedFields.data.image)
  }

  await db.update(user).set(Object.assign({
    firstName: validatedFields.data.firstname,
    lastName: validatedFields.data.lastname, 
  }, userImage!==null? { image: userImage } : null
  )).where(eq(user.id, foundUser.id))

  return {
    success: true,
    message: "Updated profile",
    imageUrl: userImage
  }
}