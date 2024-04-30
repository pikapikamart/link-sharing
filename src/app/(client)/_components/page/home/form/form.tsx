import { StartedVector } from "../../../svgs/started"
import { useHomeForm } from "./hook"
import { FormLinks } from "./links"


const Form = () =>{
  const { 
    handleSubmit, 
    handleAddNewLink, 
    fields } = useHomeForm()

  return (
    <div className="bg-white rounded-lg pt-6 max-w-[808px] relative min-h-[calc(100vh-90px)] md:pt-10">
      <div className="mb-10 px-6 md:px-10">
        <h1 className="font-bold text-2xl text-dark-grey mb-2 md:text-[32px] leading-[1.5]">Customize your links</h1>
        <p className=" text-grey">Add/edit/remove links below and then share all your profiles with the world!</p>
      </div>
      <form
        className=" lg:max-h-[540px] lg:overflow-y-auto"
        onSubmit={ handleSubmit }>
        <div className="px-6 md:px-10">
          <button
            className="w-full font-semibold text-purple border border-purple h-[46px] flex items-center justify-center rounded-lg active:bg-light-purple" 
            type="button"
            onClick={ handleAddNewLink } >+ Add new link
          </button>
        </div>
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
        <div className="border-t border-t-borders p-4 w-full absolute bottom-0 lg:py-6 lg:px-10">
          <button
            className={`font-semibold text-white h-[46px] w-full flex items-center justify-center rounded-lg bg-purple active:bg-purple-hover md:px-[26px] md:ms-auto md:w-auto aria-disabled:bg-opacity-25 ${ fields?.length===0 && "active:aria-disabled:bg-purple active:aria-disabled:bg-opacity-25" }`}
            type="submit"
            aria-disabled={ fields?.length===0 }>Save
          </button>
        </div>
      </form>
    </div>
  )
}


export default Form