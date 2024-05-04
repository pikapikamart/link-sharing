import * as Ariakit from "@ariakit/react";
import "./style.css"
import { GithubIcon } from "@/app/(client)/_components/svgs/github";
import { YoutubeIcon } from "@/app/(client)/_components/svgs/youtube";
import { LinkedinIcon } from "@/app/(client)/_components/svgs/linkedin";
import { FacebookIcon } from "@/app/(client)/_components/svgs/facebook";
import { FrontendmentorIcon } from "@/app/(client)/_components/svgs/frontendmentor";
import { HashnodeIcon } from "@/app/(client)/_components/svgs/hashnode";
import { Platform } from "@/app/(client)/_store/links";
import { CodewarsIcon } from "@/app/(client)/_components/svgs/codewars";
import { DevtoIcon } from "@/app/(client)/_components/svgs/devto";
import { FreecodecampIcon } from "@/app/(client)/_components/svgs/freecodecamp";
import { GitlabIcon } from "@/app/(client)/_components/svgs/gitlab";
import { StackoverflowIcon } from "@/app/(client)/_components/svgs/stackoverflow";
import { TwitchIcon } from "@/app/(client)/_components/svgs/twitch";
import { TwitterIcon } from "@/app/(client)/_components/svgs/twitter";
import { useHomeForm } from "../hook";


type SelectProps = {
  setValue: (value: Platform) => void
  value: Platform | ""
  index: number
  error?: string
}

const Select = (props: SelectProps) =>{
  const { 
    setValue,
    value,
    index,
    error } = props
  const hasError = (error && error !== "")
  const { watch } = useHomeForm()

  const renderPlatform = (platform?: Platform) =>{

    switch(platform ?? value) {
      case "github":

        return (
          <div
            key={ `select-${ platform }-${ props.index }` }
             className="flex items-center text-grey">
            <GithubIcon />
            <p className="ml-3 text-dark-grey">Github</p>
          </div>
        )
      case "youtube":

        return (
          <div
            key={ `select-${ platform }-${ props.index }` }
             className="flex items-center text-grey">
            <YoutubeIcon />
            <p className="ml-3 text-dark-grey">Youtube</p>
          </div>
        )
      case "linkedin":

        return (
          <div
            key={ `select-${ platform }-${ props.index }` }
             className="flex items-center text-grey">
            <LinkedinIcon />
            <p className="ml-3 text-dark-grey">Linkedin</p>
          </div>
        )
      case "facebook":

        return (
          <div
            key={ `select-${ platform }-${ props.index }` }
             className="flex items-center text-grey">
            <FacebookIcon />
            <p className="ml-3 text-dark-grey">Facebook</p>
          </div>
        )
      case "frontendmentor":

        return (
          <div
            key={ `select-${ platform }-${ props.index }` }
             className="flex items-center text-grey">
            <FrontendmentorIcon />
            <p className="ml-3 text-dark-grey">Frontend Mentor</p>
          </div>
        )
      case "hashnode":

        return (
          <div
            key={ `select-${ platform }-${ props.index }` }
             className="flex items-center text-grey">
            <HashnodeIcon />
            <p className="ml-3 text-dark-grey">Hashnode</p>
          </div>
        )
      case "codewars":

        return (
          <div
            key={ `select-${ platform }-${ props.index }` }
             className="flex items-center text-grey">
            <CodewarsIcon />
            <p className="ml-3 text-dark-grey">Codewars</p>
          </div>
        )
      case "devto":

        return (
          <div
            key={ `select-${ platform }-${ props.index }` }
             className="flex items-center text-grey">
            <DevtoIcon />
            <p className="ml-3 text-dark-grey">Dev.to</p>
          </div>
        )
      case "freecodecamp":

        return (
          <div
            key={ `select-${ platform }-${ props.index }` }
             className="flex items-center text-grey">
            <FreecodecampIcon />
            <p className="ml-3 text-dark-grey">freeCodeCamp</p>
          </div>
        )
      case "gitlab":

        return (
          <div
            key={ `select-${ platform }-${ props.index }` }
             className="flex items-center text-grey">
            <GitlabIcon />
            <p className="ml-3 text-dark-grey">Gitlab</p>
          </div>
        )
      case "stackoverflow":

        return (
          <div
            key={ `select-${ platform }-${ props.index }` }
             className="flex items-center text-grey">
            <StackoverflowIcon />
            <p className="ml-3 text-dark-grey">Stack Overflow</p>
          </div>
        )
      case "twitch":

        return (
          <div
            key={ `select-${ platform }-${ props.index }` }
             className="flex items-center text-grey">
            <TwitchIcon />
            <p className="ml-3 text-dark-grey">Twitch</p>
          </div>
        )
      case "twitter":

        return (
          <div
            key={ `select-${ platform }-${ props.index }` }
             className="flex items-center text-grey">
            <TwitterIcon />
            <p className="ml-3 text-dark-grey">Twitter</p>
          </div>
        )
    }
  }

  const renderSelections = () =>{
    const mappedSelections = ["github", "youtube", "linkedin", "facebook", "frontendmentor", "hashnode", "twitter", "twitch", "devto", "codewars", "freecodecamp", "gitlab", "stackoverflow"].map(platform => (
      <Ariakit.SelectItem 
        key={`selection-item-${ platform }-${props.index} `}
        className="select-item" 
        value={platform}
        disabled={ watch && watch("links")?.find(field => field.platform===platform)? true: false }>{ renderPlatform(platform as Platform) }
      </Ariakit.SelectItem>
    ))

    return mappedSelections
  }
 
  return (
    <div className="selectWrapper">
      <Ariakit.SelectProvider
        value={ value }
        setValue={ setValue }>
        <Ariakit.SelectLabel className="text-xs text-dark-grey mb-1 text-left pl-0">Platform</Ariakit.SelectLabel>
        <Ariakit.Select 
          className={`selectButton !w-full ${ hasError && "!border !border-red !border-solid" }`}
          {  ...hasError && {...{"aria-labelledby": `platform-${ index }`}} }>
          { renderPlatform() }
          <Ariakit.SelectArrow className="text-purple" />
        </Ariakit.Select>
        <Ariakit.SelectPopover gutter={4} sameWidth className="selectPopover">
          { renderSelections() }
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