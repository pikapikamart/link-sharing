"use client"
import { 
  UseFieldArrayReturn, 
  UseFormReturn, 
  useFieldArray, 
  useForm } from "react-hook-form"
import Form from "./form"
import { 
  createContext, 
  useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { 
  LinksSchema, 
  linksSchema } from "@/app/_server/trpc/routers/links/schema"
import { useLinksStore } from "@/app/(client)/_store/links"


type HomeFormContextProps = {
  methods: UseFormReturn<LinksSchema, any, undefined>
  fields: UseFieldArrayReturn<LinksSchema, "links", "id">
}

export const HomeFormContext = createContext<HomeFormContextProps | null>(null)

const HomeForm = () =>{
  const { links } = useLinksStore()
  const methods = useForm<LinksSchema>({
    resolver: zodResolver(linksSchema)
  })
  const fields = useFieldArray({
    name: "links",
    control: methods.control
  })
  const value: HomeFormContextProps = {
    methods,
    fields
  }

  useEffect(() =>{
    if ( links.length ) {
      methods.reset({
        links
      })
    }
  }, [links])

  return (
    <HomeFormContext.Provider value={ value } >
      <Form />
    </HomeFormContext.Provider>
  )
}


export { HomeForm }