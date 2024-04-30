import { 
  UseFieldArrayReturn, 
  UseFormReturn, 
  useFieldArray, 
  useForm } from "react-hook-form"
import Form from "./form"
import { createContext } from "react"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"


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

type HomeFormContextProps = {
  methods: UseFormReturn<HomeFormSchema, any, undefined>
  fields: UseFieldArrayReturn<HomeFormSchema, "links", "id">
}

export const HomeFormContext = createContext<HomeFormContextProps | null>(null)

const HomeForm = () =>{
  const methods = useForm<HomeFormSchema>({
    resolver: zodResolver(homeFormSchema)
  })
  const fields = useFieldArray({
    name: "links",
    control: methods.control
  })
  const value: HomeFormContextProps = {
    methods,
    fields
  }

  return (
    <HomeFormContext.Provider value={ value } >
      <Form />
    </HomeFormContext.Provider>
  )
}


export { HomeForm }