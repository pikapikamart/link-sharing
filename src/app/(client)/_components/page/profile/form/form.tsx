import { AnimatePresence } from "framer-motion"
import { Loader } from "../../../shared/loader"
import { useProfileForm } from "./hook"
import { FormImage } from "./image"
import { ProfileTextInput } from "./input/text"
import { ToastSuccess } from "../../../shared/toast/success"
import { UpdateIcon } from "../../../svgs/update"


const Form = () =>{
  const { 
    register,
    handleSubmit,
    formErrors,
    status,
    shouldShow } = useProfileForm()

  return (
    <div className="bg-white rounded-lg pt-6 max-w-[808px] relative min-h-[calc(100vh-90px)] md:pt-10">
      <div className="mb-10 px-6 md:px-10">
        <h1 className="font-bold text-2xl text-dark-grey mb-2 md:text-[32px] leading-[1.5]">Profile Details</h1>
        <p className=" text-grey">Add your details to create a personal touch to your profile.</p>
      </div>
      <form onSubmit={ handleSubmit }>
        <div className="mb-6 px-6 md:px-10 md:mb-32">
          <div className="mb-6">
            <FormImage />
          </div>
          <div className="p-5 bg-light-grey rounded-lg">
            <div className="mb-3">
              <ProfileTextInput
                label="First name *"
                attributes={{ id: "profileFirstname" }}
                placeHolder="e.g John"
                {...register("firstName")}
                error={ formErrors.firstName?.message } />
            </div>
            <div className="mb-3">
              <ProfileTextInput
                label="Last name *"
                attributes={{ id: "profileLastname" }}
                placeHolder="e.g Doe"
                {...register("lastName")}
                error={ formErrors.lastName?.message } />
            </div>
            <div className="mb-3">
              <ProfileTextInput
                label="Email"
                attributes={{
                  id: "profileEmail",
                  readOnly: true
                }}
                placeHolder="e.g john.doe@example.com"
                {...register("email")}
                error={ formErrors.email?.message } />
            </div>
          </div>
        </div>
        <div className="border-t border-t-borders p-4 w-full bottom-0 lg:absolute lg:py-6 lg:px-10">
          <button
            className={`font-semibold text-white h-[46px] w-full flex items-center justify-center rounded-lg bg-purple md:px-[26px] md:ms-auto md:w-auto aria-disabled:bg-opacity-25 lg:hover:bg-purple-hover lg:transition-all`}
            type="submit">
            { status==="executing"? <Loader /> : "Save" }  
          </button>
        </div>
      </form>
      <AnimatePresence>
        { shouldShow && (
          <ToastSuccess message="Your changes have been successfully saved!">
            <UpdateIcon />
          </ToastSuccess>
        ) }
      </AnimatePresence>
    </div>
  )
}


export default Form