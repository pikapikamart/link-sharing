import { SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { HomeFormContext } from "."
import { useContext } from "react"


export const useHomeFormContext = () => useContext(HomeFormContext)

export const homeFormSchema = z.object({
  links: z.array(z.object({
    platform: z
      .string({ message: "Make sure to choose a platform" })
      .min(1, "Make sure to choose a platform"),
    link: z
      .string()
      .url("Please enter a valid url")
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
      link: "",
      platform: ""
    })
  }

  const handleRemoveLink = (index: number) => remove(index)

  const handleFormSubmit: SubmitHandler<HomeFormSchema> = data => {
    console.log(data)
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