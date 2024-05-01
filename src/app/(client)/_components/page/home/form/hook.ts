import { SubmitHandler } from "react-hook-form"
import { HomeFormContext } from "."
import { useContext } from "react"
import { setLinks } from "@/app/(client)/_store/links"
import { LinksSchema } from "@/app/_server/trpc/routers/links/schema"
import { trpc } from "@/app/(client)/_lib/trpc"


export const useHomeFormContext = () => useContext(HomeFormContext)

export const useHomeForm = () =>{
  const context = useHomeFormContext()
  const { mutate } = trpc.links.set.useMutation()

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
    append({
      url: "",
      platform: ""
    })
  }

  const handleRemoveLink = (index: number) => remove(index)

  const handleFormSubmit: SubmitHandler<LinksSchema> = data => {
    if ( fields.length===0 ) return
    mutate(data)  
    setLinks(data.links)
  }

  return {
    fields,
    handleAddNewLink,
    handleRemoveLink,
    handleSubmit: handleSubmit(handleFormSubmit),
    formErrors,
    register,
    setValue,
    watch
  }
}