import { useLinksStore } from "@/app/(client)/_store/links"
import { useHomeForm } from "./hook"
import { FormLinks } from "./links"
import { AnimatePresence } from "framer-motion"
import { StartedVector } from "@/app/(client)/_components/svgs/started"
import { Loader } from "@/app/(client)/_components/shared/loader"
import { ToastSuccess } from "@/app/(client)/_components/shared/toast/success"
import { UpdateIcon } from "@/app/(client)/_components/svgs/update"


const Form = () =>{
  const { 
    handleSubmit, 
    handleAddNewLink, 
    fields,
    isPending,
    shouldShow } = useHomeForm()
  const { links } = useLinksStore()

  return (
    <div className="bg-white rounded-lg pt-6 relative min-h-[calc(100vh-90px)] md:pt-10">
      <div className="mb-10 px-6 md:px-10">
        <h1 className="font-bold text-2xl text-dark-grey mb-2 md:text-[32px] leading-[1.5]">Customize your links</h1>
        <p className=" text-grey">Add/edit/remove links below and then share all your profiles with the world!</p>
      </div>
      <div className="px-6 md:px-10">
        <button
          className="w-full font-semibold text-purple border border-purple h-[46px] flex items-center justify-center rounded-lg lg:hover:bg-light-purple lg:transition-all" 
          type="button"
          onClick={ handleAddNewLink } >+ Add new link
        </button>
      </div>
      <form
        className="grid grid-rows-[auto,1fr,auto] min-h-[480px] lg:max-h-[500px] lg:block lg:overflow-y-auto"
        onSubmit={ handleSubmit }>
        <div className="px-6 mt-6 text-center mb-6 md:px-10 md:mb-0">
          { fields?.length===0 && (
            <div className="bg-light-grey rounded-lg py-[46px] px-5 md:py-20 lg:py-16">
              <div>
                <div className="w-[124px] mb-6 max-w-max mx-auto md:w-[250px] md:mb-10">
                  <StartedVector />
                </div>
                <div>
                  <h2 className="mb-6 font-bold text-dark-grey text-2xl md:text-[32px]">Let’s get you started</h2>
                  <p className="text-grey max-w-[488px] mx-auto">Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!</p>
                </div>
              </div>
            </div>
          ) }
          { fields?.length!==0 && <FormLinks /> }
        </div>
        <div className="border-t border-t-borders p-4 w-full bottom-0 lg:absolute lg:py-6 lg:px-10">
          <button
            className={`font-semibold text-white h-[46px] w-full flex items-center justify-center rounded-lg bg-purple md:px-[26px] md:ms-auto md:w-auto aria-disabled:bg-opacity-25 lg:hover:bg-purple-hover lg:transition-all ${ fields?.length===0 && "active:aria-disabled:bg-purple active:aria-disabled:bg-opacity-25" }`}
            type="submit"
            aria-disabled={ links.length===0 && fields?.length===0 }>
            { isPending? <Loader /> : "Save" } 
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