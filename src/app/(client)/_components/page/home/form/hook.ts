import { SubmitHandler } from "react-hook-form"
import { HomeFormContext } from "."
import { useContext } from "react"
import { setLinks, useLinksStore } from "@/app/(client)/_store/links"
import { LinksSchema } from "@/app/_server/trpc/routers/links/schema"
import { trpc } from "@/app/(client)/_lib/trpc"
import { platforms } from "@/app/_server/database/schema"


export const useHomeFormContext = () => useContext(HomeFormContext)

export const useHomeForm = () =>{
  const context = useHomeFormContext()
  const { 
    mutate,
    isPending } = trpc.links.set.useMutation({
    onSuccess: data => {
      setLinks(data.data.links)
    }
  })
  const { links } = useLinksStore()

  if ( !context ) return {}

  const { 
    append,
    remove,
    fields } = context.fields
  const { 
    register,
    setValue,
    handleSubmit,
    watch,
    formState: {
      errors: formErrors
    } } = context.methods

  const handleAddNewLink = () =>{
    const foundAvailablePlatform = platforms.find(platform => watch("links").every(field => field.platform!==platform))

    if ( !foundAvailablePlatform ) return
    
    return append({
      url: "",
      platform: fields.length===0? "github" : foundAvailablePlatform
    })
  }

  const handleRemoveLink = (index: number) => remove(index)

  const handleFormSubmit: SubmitHandler<LinksSchema> = data => {
    if ( links.length===0 && fields.length===0 ) return

    if ( isPending ) return

    const checkForAnyValueChange = () =>{

      for ( let i = 0; i<links.length; i++ ) {

        for ( const [k,v] of Object.entries(data.links[i]) ) {
          if ( v !== links[i][k]) {

            return true
          }
        }
      }
    }

    if ( links.length!==data.links.length || checkForAnyValueChange() ) {
      mutate(data)  
    }
  }

  return {
    fields,
    handleAddNewLink,
    handleRemoveLink,
    handleSubmit: handleSubmit(handleFormSubmit),
    formErrors,
    register,
    setValue,
    watch,
    isPending
  }
}