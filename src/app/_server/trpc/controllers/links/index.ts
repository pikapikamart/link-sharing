import { db } from "@/app/_server/database";
import { Context } from "../../context";
import { LinksSchema } from "../../routers/links/schema";
import { 
  eq, 
  inArray } from "drizzle-orm";
import { 
  link, 
  user } from "@/app/_server/database/schema";
import { 
  trpcError, 
  trpcSuccess } from "../../utils";


export const setHandler = async(input: LinksSchema, ctx: Context) =>{
  const foundUser = await db.query.user.findFirst({
    where: eq(user.email, ctx.token?.email as string),
    with: {
      links: true
    }
  })

  if ( !foundUser ) {

    return trpcError("FORBIDDEN", "Make sure to login first")
  }

  const links = foundUser.links

  const removedLinks = links.filter(innerLink => input.links.every(inputLink => inputLink.platform!==innerLink.platform))

  if ( removedLinks.length ) {
    await db
      .delete(link)
      .where(inArray(link.id, removedLinks.map(removeLink => removeLink.id)))
  }
 
  const linksToBeUpdated = input.links
    .map((inputLink, index) => ({
      ...inputLink,
      position: index+1
    }))
    .filter(inputLink => inputLink.id!==undefined)

  if ( linksToBeUpdated.length ) {
    linksToBeUpdated.forEach(async updateLink => {
      const { id, ...rest } = updateLink

      await db
        .update(link)
        .set(rest)
        .where(eq(link.id, id as number))
    })
  }

  const newLinks = input.links
  .map((inputLinks, index) => ({
    ...inputLinks,
    userId: foundUser.id,
    position: index+1
  }))
  .filter(inputLink => inputLink.id===undefined)
 
  if ( newLinks.length ) {
    
    await db
      .insert(link)
      .values(newLinks)
  }

  return trpcSuccess("Successfully set links", {})
}

export const getHandler = async( ctx: Context ) =>{
  const foundUser = await db.query.user.findFirst({
    where: eq(user.email, ctx.token?.email as string),
    columns: {
      password: false
    },
    with: {
      links: {
        columns: {
          userId: false
        }
      }
    }
  })

  if ( !foundUser ) {

    return trpcError("UNAUTHORIZED", "Make sure to login first")
  }

  const links = foundUser.links

  return trpcSuccess("Success", links)
}