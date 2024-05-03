import { ProfileSchema } from "@/app/_server/trpc/routers/user/schema"
import { useSession } from "next-auth/react"
import { 
  SubmitHandler, 
  useFormContext} from "react-hook-form"
import { updateProfileAction } from "./actions"
import { useUserStore } from "@/app/(client)/_store/user"
import { useAction } from "next-safe-action/hooks";


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
  const user = useUserStore()
  const { 
    execute,
    result } = useAction(updateProfileAction, {
      onSuccess: data => {

      },
      onError: error => {
        console.log(error)
     
      }
    })

  const handleFormSubmit: SubmitHandler<ProfileSchema> = async(data) => {
    if ( !session?.user ) return

    data.email = user.email
    const fd = new FormData()

    for (const [k, v] of Object.entries(data)) {
      fd.append(k, v)
    }

    execute(fd)
  }
 
  return {
    register,
    formErrors,
    control,
    watch,
    handleSubmit: handleSubmit(handleFormSubmit)
  }
}