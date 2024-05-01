import { db } from "@/app/_server/database";
import { Context } from "../../context";
import { LinksSchema } from "../../routers/links/schema";
import { 
  SQL, 
  eq, 
  inArray, 
  sql } from "drizzle-orm";
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

  const removedLinks = links.filter(innerLink => {
    
    return input.links.every(inputLink => inputLink.platform!==innerLink.platform)
  })

  if ( removedLinks.length ) {
    await db
      .delete(link)
      .where(inArray(link.id, removedLinks.map(removeLink => removeLink.id)))
  }
 
  const linksToBeUpdated = input.links
    .filter(inputLink => links.some(innerLink => innerLink.platform===inputLink.platform))
    .map(inputLink => ({
    ...links.find(innerLink => innerLink.platform===inputLink.platform),
    url: inputLink.url
  }))

  if ( linksToBeUpdated.length ) {
    const sqlChunks: SQL[] = []
    sqlChunks.push(sql`(case`)

    linksToBeUpdated.forEach(updateLink => {
      sqlChunks.push(sql`when id = ${ updateLink.id } then ${ updateLink.url }`)
    })

    sqlChunks.push(sql`end)`)
    const finalSql: SQL = sql.join(sqlChunks, sql.raw(" "))
    
    await db
      .update(link)
      .set({
        url: finalSql
      })
      .where(inArray(link.id, linksToBeUpdated.map(updateLink => updateLink.id as number)))
  }

  const newLinks = input.links
    .filter(inputLink => links.every(innerLink => innerLink.platform!==inputLink.platform))
    .map(newLink => ({
      ...newLink,
      userId: foundUser.id
    }))
  
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