import { 
  DetailedHTMLProps, 
  InputHTMLAttributes, 
  forwardRef } from "react"


type TextProps = {
  label: string
  attributes: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  placeHolder: string
  children: React.ReactNode
  error?: string
  [key: string]: any
}


const Text: React.ForwardRefExoticComponent<TextProps & React.RefAttributes<HTMLInputElement>> = forwardRef((props, ref) => {
  const { 
    label,
    attributes,
    placeHolder,
    error,
    children,
    ...rest } = props

  return (
    <div>
      <label
        className=" text-dark-grey text-xs block mb-1" 
        htmlFor={attributes.id?? ""}>{ label }</label>
      <div className="relative">
        <input
          ref={ ref }
          { ...rest }
          type="text"
          { ...attributes }
          className={`w-full rounded-lg border-borders border text-dark-grey ps-11 py-3 placeholder:opacity-50 ${ error && "border-red pr-[128px]" }`}
          placeholder={ placeHolder }
          {...error && {...{"aria-labelledby": `error-${ attributes.id }`}}} />
        <div 
          className="absolute left-4 top-1/2 -translate-y-1/2"
          aria-hidden="true">
          { children }
        </div>
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

Text.displayName = "FormTextInput"


export default Text