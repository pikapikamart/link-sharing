import { Controller } from "react-hook-form"
import { useProfileForm } from "../hook"
import { ImageVector } from "@/app/(client)/_components/svgs/image"


const Image = () =>{
  const { 
    control,
    watch,
    formErrors } = useProfileForm()
  const isImageValid = !formErrors.image?.message && !!watch("image")
  
  return (
    <div className="p-5 bg-light-grey rounded-lg md:flex md:items-center">
      <label
        className="block text-grey mb-4 md:basis-[40%]" 
        htmlFor="profileImage">Profile picture
      </label>
      <div className="md:flex md:items-center md:basis-[60%]">
        <div className="mb-6 md:mb-0 md:mr-6">
          <div className="relative h-[194px] w-[194px] rounded-lg focus-within:outline-1 focus-within:outline-purple focus-within:outline focus-within:shadow-purple-light">
            <Controller
              control={ control }
              name="image"
              render={({field: { onChange }}) =>(
                <input
                  id="profileImage"
                  className="fixed opacity-0 left-[99999px]" 
                  type="file" 
                  onChange={event => event.target.files?.[0] && onChange(event.target.files[0])}
                  accept=".png, .jpg, .jpeg"
                  aria-labelledby={formErrors.image?.message!==undefined? "error-profileImage" : ""} />
              )}>
            </Controller>
            { isImageValid && (
              <img
                className="absolute inset-0 h-full w-full object-cover rounded-lg" 
                src={URL.createObjectURL(watch("image"))} 
                alt="" />
            ) }
            <label
              className={`absolute inset-0 rounded-lg bg-light-purple flex flex-col items-center justify-center text-purple ${ isImageValid && "opacity-0 lg:hover:opacity-100 lg:bg-black lg:bg-opacity-50 lg:cursor-pointer lg:text-white lg:transition-all" }`}
              htmlFor="profileImage">
              <div className="mb-2">
                <ImageVector />
              </div>
              <span className="font-semibold">+ Upload Image</span>
            </label>
          </div>
          { formErrors.image?.message!==undefined && (
            <span 
              className="text-red text-xs"
              id={`error-profileImage`}>{ formErrors.image.message as string }
            </span>
          ) }
        </div>
        <p className="text-grey text-xs md:max-w-[128px]">Image must be below 1024x1024px. Use PNG or JPG format.</p>
      </div>
    </div>
  )
}


export default Image