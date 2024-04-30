import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { 
  RegisterSchema, 
  registerSchema } from "@/app/_server/trpc/routers/auth/schema"


export const useRegisterForm = () =>{
  const { 
    register,
    handleSubmit,
    formState: {
      errors: formErrors
    } } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema)
  })

  const handleFormSubmit: SubmitHandler<RegisterSchema> = data =>{

  }

  return {
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
    formErrors
  }
}