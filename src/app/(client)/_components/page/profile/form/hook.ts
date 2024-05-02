import { 
  SubmitHandler, 
  useFormContext} from "react-hook-form"
import { ProfileSchema } from "."


export const useProfileForm = () =>{
  const {
    register, 
    formState: {
      errors: formErrors
    },
    handleSubmit,
    control,
    watch } = useFormContext<ProfileSchema>()

  const handleFormSubmit: SubmitHandler<ProfileSchema> = data => {

  }
 
  return {
    register,
    formErrors,
    control,
    watch,
    handleSubmit: handleSubmit(handleFormSubmit)
  }
}