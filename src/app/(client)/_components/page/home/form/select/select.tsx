import * as Ariakit from "@ariakit/react";
import "./style.css"
import { GithubIcon } from "@/app/(client)/_components/svgs/github";
import { YoutubeIcon } from "@/app/(client)/_components/svgs/youtube";
import { LinkedinIcon } from "@/app/(client)/_components/svgs/linkedin";
import { FacebookIcon } from "@/app/(client)/_components/svgs/facebook";
import { FrontendmentorIcon } from "@/app/(client)/_components/svgs/frontendmentor";
import { HashnodeIcon } from "@/app/(client)/_components/svgs/hashnode";


type SelectProps = {
  setValue: (value: string) => void
  value: string
  index: number
  error?: string
}

const Select = (props: SelectProps) =>{
  const { 
    setValue,
    value,
    index,
    error } = props
  const hasError = value==="" && (error && error !== "")

  const renderPlatform = (platform?: string) =>{

    switch(platform ?? value) {
      case "github":

        return (
          <div className="flex items-center text-grey">
            <GithubIcon />
            <p className="ml-3 text-dark-grey">Github</p>
          </div>
        )
      case "youtube":

        return (
          <div className="flex items-center text-grey">
            <YoutubeIcon />
            <p className="ml-3 text-dark-grey">Youtube</p>
          </div>
        )
      case "linkedin":

        return (
          <div className="flex items-center text-grey">
            <LinkedinIcon />
            <p className="ml-3 text-dark-grey">Linkedin</p>
          </div>
        )
      case "facebook":

        return (
          <div className="flex items-center text-grey">
            <FacebookIcon />
            <p className="ml-3 text-dark-grey">Facebook</p>
          </div>
        )
      case "frontendmentor":

        return (
          <div className="flex items-center text-grey">
            <FrontendmentorIcon />
            <p className="ml-3 text-dark-grey">Frontend Mentor</p>
          </div>
        )
      case "hashnode":

        return (
          <div className="flex items-center text-grey">
            <HashnodeIcon />
            <p className="ml-3 text-dark-grey">Hashnode</p>
          </div>
        )
      default:
        return <></>
    }
  }
 
  return (
    <div className="wrapper">
      <Ariakit.SelectProvider
        value={ value }
        setValue={ setValue }>
        <Ariakit.SelectLabel className="text-xs text-dark-grey mb-1 text-left pl-0">Platform</Ariakit.SelectLabel>
        <Ariakit.Select 
          className={`button !w-full ${ hasError && "!border !border-red !border-solid" }`}
          {  ...hasError && {...{"aria-labelledby": `platform-${ index }`}} }>
          { renderPlatform() }
          <Ariakit.SelectArrow />
        </Ariakit.Select>
        <Ariakit.SelectPopover gutter={4} sameWidth className="popover">
          <Ariakit.SelectItem className="select-item" value="github">{ renderPlatform("github") }</Ariakit.SelectItem>
          <Ariakit.SelectItem className="select-item" value="youtube">{ renderPlatform("youtube") }</Ariakit.SelectItem>
          <Ariakit.SelectItem className="select-item" value="linkedin">{ renderPlatform("linkedin") }</Ariakit.SelectItem>
          <Ariakit.SelectItem className="select-item" value="facebook">{ renderPlatform("facebook") }</Ariakit.SelectItem>
          <Ariakit.SelectItem className="select-item" value="frontendmentor">{ renderPlatform("frontendmentor") }</Ariakit.SelectItem>
          <Ariakit.SelectItem className="select-item" value="hashnode">{ renderPlatform("hashnode") }</Ariakit.SelectItem>
        </Ariakit.SelectPopover>
      </Ariakit.SelectProvider>
      { hasError && (
        <p
          id={`platform-${ index }`} 
          className="text-xs text-red mt-1">{ error }</p>
      ) }
    </div>
  );
}


export default Select