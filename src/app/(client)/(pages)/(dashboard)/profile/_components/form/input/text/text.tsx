import { 
  DetailedHTMLProps, 
  InputHTMLAttributes, 
  forwardRef } from "react"


type TextProps = {
  label: string
  attributes: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  placeHolder: string
  error?: string
  [key: string]: any
}


const Text: React.ForwardRefExoticComponent<TextProps & React.RefAttributes<HTMLInputElement>> = forwardRef((props, ref) => {
  const { 
    label,
    attributes,
    placeHolder,
    error,
    ...rest } = props

  return (
    <div className="md:flex md:items-center">
      <label
        className=" text-grey text-xs block mb-1 md:basis-[40%] md:text-base" 
        htmlFor={attributes.id?? ""}>{ label }</label>
      <div className="relative md:basis-[60%]">
        <input
          ref={ ref }
          { ...rest }
          type="text"
          { ...attributes }
          className={`w-full rounded-lg border-borders border text-dark-grey px-4 py-3 placeholder:opacity-50 ${ error && "border-red pr-[128px]" }`}
          placeholder={ placeHolder }
          {...error && {...{"aria-labelledby": `error-${ attributes.id }`}}} />
        { error && (
          <span 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-red text-xs"
            id={`error-${ attributes.id }`}>{ error }
          </span>
        ) }
      </div>
    </div>
  )
})

Text.displayName = "ProfileTextInput"


export default Text