import { zodResolver } from "@hookform/resolvers/zod"
import { 
  SubmitHandler, 
  useFieldArray, 
  useForm } from "react-hook-form"
import { z } from "zod"


const homeFormSchema = z.object({
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
  const { 
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors: formErrors
    } } = useForm<HomeFormSchema>({
    resolver: zodResolver(homeFormSchema)
  })
  const { 
    fields, 
    append, 
    remove,
    swap } = useFieldArray({
    name: "links",
    control
  })

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
    register,
    setValue,
    handleRemoveLink,
    handleSubmit: handleSubmit(handleFormSubmit),
    formErrors,
    watch
  }
}