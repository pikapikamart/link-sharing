import { 
  UseFieldArrayReturn, 
  UseFormReturn, 
  useFieldArray, 
  useForm } from "react-hook-form"
import Form from "./form"
import { createContext } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { 
  HomeFormSchema, 
  homeFormSchema } from "./hook"


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