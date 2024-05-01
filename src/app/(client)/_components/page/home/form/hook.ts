import { SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { HomeFormContext } from "."
import { useContext } from "react"
import { setLinks } from "@/app/(client)/_store/links"


export const useHomeFormContext = () => useContext(HomeFormContext)

export const homeFormSchema = z.object({
  links: z.array(z.object({
    platform: z
      .enum(["", "github", "youtube", "linkedin", "facebook", "frontendmentor", "hashnode", "web", "twitter", "twitch", "devto", "codewars", "freecodecamp", "gitlab", "stackoverflow"]),
    url: z
      .string()
      .url("Please check the url")
  }))
})

export type HomeFormSchema = z.TypeOf<typeof homeFormSchema>

export const useHomeForm = () =>{
  const context = useHomeFormContext()

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

  const handleFormSubmit: SubmitHandler<HomeFormSchema> = data => {
    if ( fields.length===0 ) return

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