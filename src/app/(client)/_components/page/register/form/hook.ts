import { 
  SubmitHandler, 
  useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/app/_server/trpc/routers/auth/schema"
import z from 'zod'
import { trpc } from "@/app/(client)/_lib/trpc"
import { signIn } from "next-auth/react"


const formSchema = z
  .object({
    confirmPassword: z
      .string({ message: "Can't be empty" })
      .min(8, "Please check again")
  })
  .merge(registerSchema)

type FormSchema = z.TypeOf<typeof formSchema>

export const useRegisterForm = () =>{
  const { 
    register,
    handleSubmit,
    formState: {
      errors: formErrors
    },
    getValues,
    setError } = useForm<FormSchema>({ resolver: zodResolver(formSchema) })
  const { 
    mutate,
    isPending } = trpc.auth.register.useMutation({
    onSuccess: () =>{
      signIn("credentials", {
        email: getValues("email"),
        password: getValues("password"),
        callbackUrl: "/"
      })
    },
    onError: error => {
      const [ field, message ] = error.message.split(":")
      
      if ( field==="email" ) {
        setError("email", { message })
      }
    }
  })

  const handleFormSubmit: SubmitHandler<FormSchema> = data =>{
    if ( data.password !== data.confirmPassword ) {
      
      return setError("confirmPassword", { message: "Password does not match" })
    }

    if ( isPending ) return

    mutate({
      email: data.email,
      password: data.password
    })
  }

  return {
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
    formErrors,
    isPending
  }
}