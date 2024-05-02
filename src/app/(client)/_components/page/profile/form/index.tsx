import { 
  FormProvider, 
  useForm } from "react-hook-form"
import Form from "./form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { 
  ProfileSchema, 
  profileSchema } from "@/app/_server/trpc/routers/user/schema"


const ProfileForm = () => {
  const methods = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema)
  })
  const { data} = useSession()
  
  useEffect(() =>{
    if ( data?.user?.email ) {
      methods.reset({
        email: data.user.email
      })
    }
  }, [ data ])

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  )
}


export { ProfileForm }