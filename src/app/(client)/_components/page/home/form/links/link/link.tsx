import { DragIcon } from "@/app/(client)/_components/svgs/drag"
import { HomeFormSelect } from "../../select"
import { FormTextInput } from "@/app/(client)/_components/shared/form/input/text"
import { useHomeForm } from "../../hook"
import { LinkIcon } from "@/app/(client)/_components/svgs/link"
import { useContext } from "react"
import { SortableItemContext } from "."


export type LinkProps = {
  index: number
}

const Link = ({ index }: LinkProps) =>{
  const { 
    handleRemoveLink,
    register,
    watch,
    setValue,
    formErrors } = useHomeForm()
  const { 
    attributes,
    listeners,
    ref } = useContext(SortableItemContext)

  return (
    <div className="bg-light-grey rounded-lg p-5 text-left mb-6">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <button 
            className="DragHandle h-6 w-6 grid place-content-center"
            {...attributes}
            {...listeners}
            type="button"
            ref={ ref }>
            <span className="sr-only">Drag item</span>
            <DragIcon />
          </button>
          <p className="ml-2 font-bold text-grey">Link #{ index+1 }</p>
        </div>
        <button
          onClick={ () => handleRemoveLink && handleRemoveLink(index) } 
          className="text-grey"
          type="button">Remove</button>
      </div>
      <div className="mb-3">
        <HomeFormSelect
          index={ index } 
          setValue={ (value) => setValue && setValue(`links.${ index }.platform`, value) }
          error={ formErrors?.links?.[index]?.platform?.message }
          value={ watch? watch(`links.${ index }.platform`) : "" } />
      </div>
      <div>
        <FormTextInput
          label="Link"
          attributes={{ id: `link-${ index }` }}
          placeHolder="e.g. something.com"
          error={ formErrors?.links?.[index]?.url?.message }
          { ...(register && register(`links.${ index }.url`)) }>
          <div className="w-4 h-4 text-grey">
            <LinkIcon />
          </div>
        </FormTextInput>
      </div>
    </div>
  )
}


export default Link