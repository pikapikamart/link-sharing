"use client"
import Link from "next/link"
import { EmailIcon } from "../../../svgs/email"
import { LogoIcon } from "../../../svgs/logo"
import { PasswordIcon } from "../../../svgs/password"
import { useRegisterForm } from "./hook"
import { FormTextInput } from "../../../shared/form/input/text"
import { Loader } from "../../../shared/loader"
import { AnimatePresence } from "framer-motion"


const Form = () =>{
  const { 
    register,
    handleSubmit,
    formErrors,
    isLoading } = useRegisterForm()

  return (
    <div>
      <div className="max-w-max mb-16 md:mb-[50px] md:mx-auto">
        <LogoIcon />
      </div>
      <form 
        className="max-w-[476px] mx-auto rounded-lg md:p-10 md:bg-white"
        onSubmit={ handleSubmit }>
        <div className="mb-10">
          <h1 className="text-dark-grey text-2xl font-bold mb-2 md:text-[32px]">Login</h1>
          <p className="text-grey">Add your details below to get back into the app</p>
        </div>
        <div className="mb-6">
          <div className="mb-6">
            <FormTextInput
              label="Email address"
              attributes={{ id: "email" }}
              placeHolder="e.g. alex@email.com"
              error={ formErrors.email?.message }
              { ...register("email") }>
              <EmailIcon />
            </FormTextInput>
          </div>
          <div className="mb-6">
            <FormTextInput
              label="Create password"
              attributes={{ 
                id: "password" ,
                type: "password"
              }}
              placeHolder="Enter your password"
              error={ formErrors.password?.message }
              { ...register("password") }>
              <PasswordIcon />
            </FormTextInput>
          </div>
        </div>
        <button
          className={`mb-6 font-semibold text-white h-[46px] w-full flex items-center justify-center rounded-lg bg-purple active:bg-purple-hover ${ isLoading && "active:bg-purple" }`}
          type="submit">
          { isLoading? <Loader /> : "Login" }
        </button>
        <p className="text-grey text-center flex flex-col items-center md:block">
          Don't have an account? 
          <Link
            className="text-purple md:ml-[2px]" 
            href="/register">Create account
          </Link>
        </p>
      </form>
    </div>
  )
}


export default Form