"use server"
import { db } from "@/app/_server/database"
import { user } from "@/app/_server/database/schema"
import { profileSchema } from "@/app/_server/trpc/routers/user/schema"
import { eq } from "drizzle-orm"
import { Session } from "next-auth"
import cloudinary from "@/app/_server/utils/cloudinary"
import { File } from "buffer"
import { createAction } from "@/app/(client)/_lib/utils/action"
import { zfd } from "zod-form-data"
import { z } from "zod"


const schema = zfd.formData(profileSchema
  .omit({ image: true })
  .merge(z.object({
    image: z.any()
  }))
)

export const updateProfileAction = createAction(schema, async(input) =>{
  const foundUser = await db.query.user.findFirst({
    where: eq(user.email,  input.email)
  })

  if ( !foundUser ) {

    return {
      error: "Please login first"
    }
  }

  let userImage = ""

  if ( foundUser.image===null && input.image && typeof input.image!=="string" ) {
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

    await createImage(input.image)
  }
  
  await db
    .update(user)
    .set(Object.assign({
      firstName: input.firstName,
      lastName: input.lastName, 
    }, userImage!==null? { image: userImage } : null))
    .where(eq(user.id, foundUser.id))

  return {
    success: "Successfully updated profile",
    data: {
      image: userImage
    }
  }
})