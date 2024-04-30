import { 
  SubmitHandler, 
  useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { 
  RegisterSchema, 
  registerSchema } from "@/app/_server/trpc/routers/auth/schema"
import { trpc } from "@/app/(client)/_lib/trpc"
import { signIn } from "next-auth/react"
import { useEffect } from "react"


export const useRegisterForm = () =>{
  const { 
    register,
    handleSubmit,
    formState: {
      errors: formErrors
    },
    getValues,
    watch,
    setError } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema)
  })
  const query = trpc.auth.validate.useQuery({
    email: watch("email"),
    password: watch("password")
  }, {
    enabled: false,
    refetchOnWindowFocus: false,
  })

  const handleFormSubmit: SubmitHandler<RegisterSchema> = data =>{
    if ( query.isLoading ) return 
    
    query.refetch()
  }

  useEffect(() =>{
    if ( query.isSuccess ) {
      signIn("credentials", {
        callbackUrl: '/',
        email: getValues("email"),
        password: getValues("password")
      })
    }
  }, [ query.isSuccess ])

  useEffect(() =>{
    if ( query.isError ) {
      const [ field, message ] = query.error.message.split(":")

      switch(field) {
        case "email":

          return setError("email", { message })

        case "password":

          return setError("password", { message })
      }
    }
  }, [query.isError])

  return {
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
    formErrors,
    isLoading: query.isLoading
  }
}