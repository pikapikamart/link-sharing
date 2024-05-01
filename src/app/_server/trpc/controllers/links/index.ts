import { Context } from "../../context";
import { LinksSchema } from "../../routers/links/schema";


export const setHandler = (input: LinksSchema, ctx: Context) =>{
  console.log(ctx)
}