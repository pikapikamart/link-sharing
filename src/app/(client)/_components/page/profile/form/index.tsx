import { 
  FormProvider, 
  useForm } from "react-hook-form"
import Form from "./form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useUserStore } from "@/app/(client)/_store/user"
import { 
  ProfileSchema, 
  profileSchema } from "./hook"


const ProfileForm = () => {
  const methods = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema)
  })
  const user = useUserStore()
  
  useEffect(() =>{
    methods.setValue("email", user.email)
    methods.setValue("firstName", user.firstName?? "")
    methods.setValue("lastName", user.lastName?? "")

    if ( !methods.getValues("image") ) {
      
      methods.setValue("image", user.image)
    }
  }, [ user ])

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  )
}


export { ProfileForm }