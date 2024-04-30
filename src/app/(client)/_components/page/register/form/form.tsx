"use client"
import Link from "next/link"
import { EmailIcon } from "../../../svgs/email"
import { LogoIcon } from "../../../svgs/logo"
import { PasswordIcon } from "../../../svgs/password"
import { useRegisterForm } from "./hook"


const Form = () =>{
  const { 
    register,
    handleSubmit,
    formErrors } = useRegisterForm()

  return (
    <div>
      <div className="max-w-max mb-16 md:mb-[50px] md:mx-auto">
        <LogoIcon />
      </div>
      <form 
        className="max-w-[476px] mx-auto rounded-lg md:p-10 md:bg-white"
        onSubmit={ handleSubmit }>
        <div className="mb-10">
          <h1 className="text-dark-grey text-2xl font-bold mb-2 md:text-[32px]">Create account</h1>
          <p className="text-grey">Let’s get you started sharing your links!</p>
        </div>
        <div className="mb-6">
          <div className="mb-6">
            <label
              className=" text-dark-grey text-xs block mb-1" 
              htmlFor="email">Email address</label>
            <div className="relative">
              <input
                className="w-full rounded-lg border-borders border text-dark-grey ps-11 py-3 placeholder:opacity-50" 
                type="text"
                id="email"
                placeholder="e.g. alex@email.com" />
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <EmailIcon />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label
              className=" text-dark-grey text-xs block mb-1" 
              htmlFor="password">Create password</label>
            <div className="relative">
              <input
                className="w-full rounded-lg border-borders border text-dark-grey ps-11 py-3 placeholder:opacity-50" 
                type="text"
                id="password"
                placeholder="At least .8 characters" />
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <PasswordIcon />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label
              className=" text-dark-grey text-xs block mb-1" 
              htmlFor="confirmPassword">Confirm password</label>
            <div className="relative">
              <input
                className="w-full rounded-lg border-borders border text-dark-grey ps-11 py-3 placeholder:opacity-50" 
                type="text"
                id="confirmPassword"
                placeholder="At least .8 characters" />
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <PasswordIcon />
              </div>
            </div>
          </div>
          <p className="mt-6 text-grey text-xs">Password must contain at least 8 characters</p>
        </div>
        <button
          className="mb-6 font-semibold text-white h-[46px] w-full flex items-center justify-center rounded-lg bg-purple"
          type="submit">Create new account
        </button>
        <p className="text-grey text-center flex flex-col items-center md:block">
          Already have an account? 
          <Link
            className="text-purple md:ml-[2px]" 
            href="/login">Login
          </Link>
        </p>
      </form>
    </div>
  )
}


export default Form