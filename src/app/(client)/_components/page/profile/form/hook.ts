import { ProfileSchema } from "@/app/_server/trpc/routers/user/schema"
import { useSession } from "next-auth/react"
import { 
  SubmitHandler, 
  useFormContext} from "react-hook-form"
import { updateProfile } from "./actions"


export const useProfileForm = () =>{
  const {
    register, 
    formState: {
      errors: formErrors
    },
    handleSubmit,
    control,
    watch } = useFormContext<ProfileSchema>()
  const { data: session } = useSession()
  console.log(formErrors)
  const handleFormSubmit: SubmitHandler<ProfileSchema> = async(data) => {
    if ( !session?.user ) return

    const fd = new FormData()

    for (const [k, v] of Object.entries(data)) {
      fd.append(k, v)
    }

    await updateProfile(session, fd)
  }
 
  return {
    register,
    formErrors,
    control,
    watch,
    handleSubmit: handleSubmit(handleFormSubmit)
  }
}